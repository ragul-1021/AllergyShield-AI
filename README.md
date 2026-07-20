# 🛡️ AllergyShield AI

> AI-powered Food Allergy Detection & Smart Ingredient Analyzer

AllergyShield AI is a full-stack web application that helps users identify potentially harmful allergens from packaged food products. Users simply upload an image of an ingredient label, and the system extracts the text using OCR, analyzes the ingredients, and warns users about allergens based on their personal allergy profile.


## ✨ Features

- 🔐 User Authentication (JWT)
- 👤 User Registration & Login
- 📷 Upload Food Label Images
- 📝 OCR Text Extraction
- 🧠 AI Ingredient Analysis
- ⚠️ Detect Common Food Allergens
- 📊 Scan History
- 🗄️ PostgreSQL Database
- 🌐 Responsive React Frontend
- 🚀 FastAPI Backend
- ☁️ Cloud Deployment Ready

---

# 🏗️ Tech Stack

## Frontend

- React.js
- Vite
- Axios
- CSS

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib (Password Hashing)

## Database

- PostgreSQL
- Neon Database

## OCR

- EasyOCR

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
AllergyShield-AI/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── database/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── Dockerfile
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/AllergyShield-AI.git

cd AllergyShield-AI
```

---

## 2. Backend Setup

```bash
cd backend

python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on

```
http://localhost:8000
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=your_database_url

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------------|----------------|
| POST | /auth/register | Register User |
| POST | /auth/login | Login User |
| GET | /auth/profile | User Profile |

---

## OCR

| Method | Endpoint |
|----------|--------------|
| POST | /scan |

Upload a food label image and receive extracted ingredients.

---

## Scan History

| Method | Endpoint |
|----------|----------------|
| GET | /history |
| DELETE | /history/{id} |

---

# 🧠 Workflow

```
User
   │
   ▼
Upload Food Label
   │
   ▼
OCR (EasyOCR)
   │
   ▼
Extract Ingredients
   │
   ▼
Ingredient Analysis
   │
   ▼
Allergen Detection
   │
   ▼
Safety Report
```

---

# 🚀 Future Improvements

- Barcode Scanner
- Nutrition Analysis
- Multi-language OCR
- Product Recommendation
- AI Chatbot
- Voice Assistant
- Mobile App
- Personalized Allergy Profiles
- Cloud Image Storage
- Food Product Database Integration

---

# 📷 Screenshots

## Login

(Add Screenshot)

---

## Dashboard

(Add Screenshot)

---

## Scan Result

(Add Screenshot)

---

# 👨‍💻 Author

**Ragul B**

Artificial Intelligence & Machine Learning Student

Saveetha Engineering College

GitHub:
https://github.com/ragul-1021

LinkedIn:
www.linkedin.com/in/ragular

---

# ⭐ Support

If you like this project,

⭐ Star this repository

🍴 Fork it

🛠️ Contribute to it

---

# 📄 License

This project is licensed under the MIT License.

---

## 🌟 Why AllergyShield AI?

Millions of people suffer from food allergies and often struggle to understand ingredient labels. AllergyShield AI simplifies this process by combining OCR, machine learning concepts, and intelligent ingredient analysis into one easy-to-use platform, helping users make safer food choices.
