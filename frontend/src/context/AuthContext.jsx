import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('churnpred_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('churnpred_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('churnpred_user');
    }
  }, [user]);

  const signup = (name, email, password) => {
    // Get existing users list
    const users = JSON.parse(localStorage.getItem('churnpred_users') || '[]');

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = { name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('churnpred_users', JSON.stringify(users));

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    return { success: true };
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('churnpred_users') || '[]');
    const found = users.find((u) => u.email === email && u.password === password);

    if (!found) {
      return { success: false, message: 'Invalid email or password.' };
    }

    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates) => {
    const users = JSON.parse(localStorage.getItem('churnpred_users') || '[]');
    const idx = users.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem('churnpred_users', JSON.stringify(users));
    }

    const newUser = { ...user, ...updates };
    setUser(newUser);
  };

  const value = { user, signup, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
