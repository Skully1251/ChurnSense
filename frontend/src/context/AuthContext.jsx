import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---- Listen for Firebase auth state changes ---- */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch extra profile data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        const firestoreData = userDoc.exists() ? userDoc.data() : {};

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firestoreData.name || '',
          photoURL: firebaseUser.photoURL || firestoreData.photoURL || '',
          provider: firestoreData.provider || 'email',
          createdAt: firestoreData.createdAt || null,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ---- Email / Password Signup ---- */
  const signup = async (name, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name on Firebase Auth profile
      await updateProfile(cred.user, { displayName: name });

      // Store extended profile in Firestore
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        photoURL: '',
        provider: 'email',
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });

      return { success: true };
    } catch (err) {
      return { success: false, message: mapFirebaseError(err.code) };
    }
  };

  /* ---- Email / Password Login ---- */
  const login = async (email, password) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      // Update last login timestamp
      await setDoc(
        doc(db, 'users', cred.user.uid),
        { lastLoginAt: serverTimestamp() },
        { merge: true }
      );

      return { success: true };
    } catch (err) {
      return { success: false, message: mapFirebaseError(err.code) };
    }
  };

  /* ---- Google Sign-In ---- */
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Upsert user doc in Firestore
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        // Returning user — update last login
        await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
      } else {
        // New user — create full profile
        await setDoc(userRef, {
          name: firebaseUser.displayName || '',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || '',
          provider: 'google',
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });
      }

      return { success: true };
    } catch (err) {
      // User closed popup
      if (err.code === 'auth/popup-closed-by-user') {
        return { success: false, message: '' };
      }
      return { success: false, message: mapFirebaseError(err.code) };
    }
  };

  /* ---- Logout ---- */
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  /* ---- Update Profile ---- */
  const updateUser = async (updates) => {
    if (!auth.currentUser) return;

    try {
      // Update Firebase Auth display name if provided
      if (updates.name) {
        await updateProfile(auth.currentUser, { displayName: updates.name });
      }

      // Update Firestore document
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const firestoreUpdates = {};
      if (updates.name) firestoreUpdates.name = updates.name;
      if (updates.email) firestoreUpdates.email = updates.email;

      if (Object.keys(firestoreUpdates).length > 0) {
        await setDoc(userRef, firestoreUpdates, { merge: true });
      }

      // Update local state
      setUser((prev) => ({
        ...prev,
        displayName: updates.name || prev.displayName,
        email: updates.email || prev.email,
      }));
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const value = { user, loading, signup, login, loginWithGoogle, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ---- Friendly error messages ---- */
function mapFirebaseError(code) {
  const map = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-blocked': 'Popup was blocked. Please allow popups and try again.',
    'auth/account-exists-with-different-credential':
      'An account already exists with this email using a different sign-in method.',
  };
  return map[code] || 'An unexpected error occurred. Please try again.';
}
