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

### 1. Setting up the Backend (Flask API)

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

### 2. Setting up the Frontend (React/Vite)

Open a new terminal window and navigate to the `frontend` folder:
```bash
cd frontend
```

**Install dependencies:**
```bash
npm install
```

**Configure Environment Variables:**
Create a `.env` file in the `frontend/` directory (this connects the React app to the running Flask server):
```env
VITE_API_URL=http://localhost:5000
```

**Start the Development Server:**
```bash
npm run dev
```
*The web app should now be running on `http://localhost:5173`. Click the link in your terminal to open it in your browser.*

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, React Router, GSAP/OGL (for 3D/animations), Lucide Icons
- **Backend:** Python, Flask, Flask-CORS, python-dotenv
- **Machine Learning:** Scikit-Learn, Pandas, NumPy, XGBoost, Imbalanced-Learn, Joblib


