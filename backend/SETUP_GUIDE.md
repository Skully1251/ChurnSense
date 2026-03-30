# ChurnSense — Setup & Integration Guide

## Folder Structure

```
ChurnSense/                     ← your existing frontend repo
├── src/
│   ├── pages/
│   │   ├── ServiceDetails.jsx  ← REPLACE with new file
│   │   ├── Results.jsx         ← REPLACE with new file
│   │   └── Results.css         ← REPLACE with new file
│   └── ...
│
backend/                        ← NEW folder (create this)
├── app.py
├── requirements.txt
└── models/
    ├── telecom/
    │   ├── telecom_churn_model.pkl
    │   ├── telecom_feature_columns.pkl
    │   ├── telecom_scaler.pkl          (optional)
    │   └── telecom_best_threshold.pkl  (optional)
    ├── banking/
    │   ├── banking_churn_best_model.pkl
    │   ├── banking_feature_columns.pkl
    │   ├── banking_scaler.pkl
    │   └── banking_best_threshold.pkl
    ├── ecommerce/
    │   ├── ecommerce_churn_model.pkl
    │   ├── ecommerce_feature_columns.pkl
    │   ├── ecommerce_scaler.pkl
    │   └── ecommerce_best_threshold.pkl
    ├── saas/
    │   ├── saas_churn_model.pkl
    │   ├── saas_feature_columns.pkl
    │   ├── saas_scaler.pkl
    │   └── saas_best_threshold.pkl
    └── insurance/
        ├── insurance_churn_model.pkl
        ├── insurance_feature_columns.pkl
        ├── insurance_scaler.pkl
        └── insurance_best_threshold.pkl
```

---

## Step 1 — Set up backend

```bash
# Create backend folder next to your frontend
mkdir backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## Step 2 — Add your model files

Download all .pkl files from Google Drive and place them in the
correct subfolders under backend/models/ as shown above.

---

## Step 3 — Run the backend

```bash
cd backend
python app.py
```

You should see:
```
ChurnSense backend starting on http://localhost:5000
```

Test it works:
```
http://localhost:5000/health
```

Should return: {"message": "ChurnSense backend is running", "status": "ok"}

---

## Step 4 — Update frontend files

Replace these files in your src/pages/ folder:
- ServiceDetails.jsx  ← replace with new version
- Results.jsx         ← replace with new version
- Results.css         ← replace with new version

---

## Step 5 — Run the frontend

```bash
cd ChurnSense
npm install
npm run dev
```

Frontend runs on: http://localhost:5173
Backend runs on:  http://localhost:5000

Both must be running at the same time.

---

## How it works end to end

1. User selects industry on Dashboard page
2. User uploads CSV on ServiceDetails page
3. React sends CSV to Flask: POST /api/predict/{serviceType}
4. Flask preprocesses → loads model → predicts → returns JSON
5. React navigates to Results page with full prediction data
6. Results page shows:
   - 5 stat cards (total, high, medium, low, churn rate)
   - 3 tabs: Overview / Customers / Insights
   - Overview: plain English summary + donut chart + feature importance
   - Customers: searchable/filterable table with risk + suggestions
   - Insights: detailed plain English explanation per risk level

---

## Industry to Model mapping

| Frontend service ID | Model used        |
|---------------------|-------------------|
| telecom             | telecom model     |
| saas                | saas model        |
| retail              | ecommerce model   |
| finance             | banking model     |
| healthcare          | insurance model   |

---

## Troubleshooting

CORS error in browser:
  - Make sure backend is running on port 5000
  - flask-cors is installed

Model file not found error:
  - Check pkl file names match exactly what is in MODEL_CONFIG in app.py

Column mismatch error:
  - The uploaded CSV columns must match what the model was trained on
  - Make sure users upload the correct format CSV for each industry
