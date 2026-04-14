# ChurnSense - Multi-Industry Churn Prediction Application

ChurnSense is a full-stack platform that provides tailored churn prediction models for different industries (Banking, E-commerce, Insurance, SaaS, Telecom). 

It features a React/Vite frontend for checking churn probabilities, powered by a Python (Flask) backend that runs machine learning models.

## 📁 Project Architecture

The repository is structured into three main isolated components:

- **`frontend/`**: The React/Vite web interface that users interact with.
- **`backend/`**: The Flask REST API that loads exported `.pkl` models and processes prediction requests.
- **`ml_pipeline/`**: The data science Jupyter notebooks and original datasets used to train, tune, and evaluate the models.
- **`sample_data/`**: Example CSV datasets for each industry to easily test the frontend's prediction capabilities.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (includes `npm`)
- [Python 3.8+](https://www.python.org/) 
- A [Firebase](https://firebase.google.com/) project (see Firebase Setup below)

---

### 1. Firebase Setup

This project uses **Firebase Authentication** (Email/Password + Google Sign-In) and **Cloud Firestore** to store user profiles.

#### Step 1: Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **"Add project"** and follow the prompts to create a new project.

#### Step 2: Enable Authentication Providers
1. In your Firebase project, go to **Build → Authentication → Sign-in method**.
2. Enable **Email/Password** provider.
3. Enable **Google** provider — select a support email and save.

#### Step 3: Create a Firestore Database
1. Go to **Build → Firestore Database**.
2. Click **"Create database"**.
3. Choose **Start in test mode** (for development) or configure security rules for production.
4. Select a Cloud Firestore location closest to your users.

#### Step 4: Register a Web App
1. Go to **Project Settings** (gear icon) → **General** → **Your apps**.
2. Click the **web icon (`</>`)** to register a new web app.
3. Copy the Firebase config object. You will need these values for the `.env` file.

#### Step 5: Add Config to Environment
Copy the example env file and fill in your Firebase credentials:
```bash
cd frontend
cp .env.example .env
```
Then edit `frontend/.env` with your Firebase config values:
```env
VITE_API_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### 2. Setting up the Backend (Flask API)

Open a terminal and navigate to the `backend` folder:
```bash
cd backend
```

**Create a virtual environment (Recommended):**
```bash
# For Windows
python -m venv venv
.\venv\Scripts\activate

# For Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

**Install dependencies:**
```bash
pip install -r requirements.txt
```

**Configure Environment Variables:**
Create a `.env` file in the `backend/` directory:
```env
FLASK_ENV=development
PORT=5000
ALLOWED_CORS_ORIGIN=http://localhost:5173
```

**Start the Flask Server:**
```bash
python app.py
```
*The backend should now be running on `http://localhost:5000`.*

---

### 3. Setting up the Frontend (React/Vite)

Open a new terminal window and navigate to the `frontend` folder:
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Configure Environment Variables:**
If you haven't already, copy `.env.example` to `.env` and fill in your Firebase config (see Firebase Setup above).

**Start the Development Server:**
```bash
npm run dev
```
*The web app should now be running on `http://localhost:5173`. Click the link in your terminal to open it in your browser.*

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, React Router, GSAP/OGL (for 3D/animations), Lucide Icons
- **Authentication:** Firebase Authentication (Email/Password, Google Sign-In)
- **Database:** Cloud Firestore (user profiles & session data)
- **Backend:** Python, Flask, Flask-CORS, python-dotenv
- **Machine Learning:** Scikit-Learn, Pandas, NumPy, XGBoost, Imbalanced-Learn, Joblib


