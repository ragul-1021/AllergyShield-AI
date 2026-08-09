🛡️ AllergyShield AI — README Summary
# 🛡️ AllergyShield AI

### Intelligent Food Label Analysis & Personalized Allergen Detection

> **Scan. Detect. Understand. Stay Safe.**

AllergyShield AI is an AI-assisted food safety platform that analyzes packaged-food ingredient labels and identifies potential allergens.

It combines OCR, ingredient normalization, an expandable allergen knowledge base, personalized allergy profiles, authentication, and scan history.

---

## 🚀 Key Features

- 📷 Food ingredient label scanning
- 🔍 OCR-based ingredient extraction
- 🧠 Ingredient and allergen matching
- 🔄 Ingredient synonym support
- 🧪 Allergen category and severity detection
- 👤 Personalized allergy profiles
- 🔐 JWT-based authentication
- 📋 User scan history
- 🇮🇳 Indian ingredient support
- 🌍 International ingredient terminology support
- 📊 Personalized risk analysis
- 🎨 Animated responsive frontend

---

## 🔬 How It Works

```text
Food Label
    ↓
Image Upload
    ↓
OCR
    ↓
Text Cleaning
    ↓
Ingredient Normalization
    ↓
Allergen Knowledge Base
    ↓
Personalized Risk Analysis
    ↓
Safety Result

Example:

Soy Lecithin
      ↓
Soy
      ↓
Potential Allergen
Whey
  ↓
Milk / Dairy
  ↓
Potential Allergen
🧠 Ingredient Knowledge Base

The system is designed to support an expandable knowledge base containing:

1,000+ ingredient names
40+ allergen categories
Ingredient synonyms
Scientific names
Food additive identifiers
Indian ingredient names
International terminology
Severity information

Example:

{
  "ingredient": "whey",
  "allergen": "milk",
  "category": "dairy",
  "severity": "high"
}
🇮🇳 Indian Ingredient Support

The knowledge base can include commonly used Indian ingredients such as:

atta
maida
suji
rava
besan
paneer
ghee
dahi
lassi
poha
murmura
ragi
jowar
bajra
rajma
moong
urad
toor
chana
hing
jeera
ajwain
elaichi
haldi
imli
sabudana
🏗️ Architecture
             USER
               │
               ▼
      React + Vite Frontend
               │
            REST API
               │
               ▼
          FastAPI Backend
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
      OCR   Knowledge  PostgreSQL
            Base
       └───────┼────────┘
               ▼
        Risk Analysis
               │
               ▼
        Safety Results
🛠️ Technology Stack
Frontend
React
Vite
JavaScript
React Router
Axios
Framer Motion
GSAP
React Icons / Lucide
Backend
Python
FastAPI
Uvicorn
SQLAlchemy
Pydantic
JWT
Passlib / bcrypt
Database
PostgreSQL
SQLAlchemy ORM
AI / OCR
OCR-based text extraction
Text normalization
Ingredient knowledge base
Rule-based allergen detection
Deployment
Vercel for frontend
Cloud hosting for backend
PostgreSQL database
📁 Project Structure
AllergyShield-AI/
│
├── backend/
├── frontend/
├── ml/
├── docs/
├── requirements.txt
└── README.md
🚀 Run Locally
Prerequisites
Python 3.x
Node.js
npm
PostgreSQL
Git
Clone
git clone https://github.com/ragul-1021/AllergyShield-AI.git
cd AllergyShield-AI
Backend
cd backend
python -m venv myenv

Windows:

myenv\Scripts\activate

Install:

pip install -r requirements.txt

Run:

uvicorn app.main:app --reload
Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Production build:

npm run build
🔑 Environment Variables

Create your own .env file.

Example:

VITE_API_URL=http://127.0.0.1:8000

Never commit:

.env
.env.local
.env.production

Never expose:

Database passwords
JWT secrets
API keys
OAuth secrets
SMTP passwords
Production credentials

Use .env.example as a safe template.

🍴 Fork & Run

Anyone can fork the project and create their own independent instance.

git clone https://github.com/YOUR_USERNAME/AllergyShield-AI.git
cd AllergyShield-AI

Then:

cd frontend
npm install
npm run dev

For the backend:

cd backend
python -m venv myenv
myenv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Each fork should use its own database and environment variables.

🌐 Deployment
Frontend

Recommended configuration for Vercel:

Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Backend

Deploy the FastAPI backend separately and configure the production environment variables.

Database

Use a separate PostgreSQL database for each deployment.

📈 Roadmap
Completed
 User registration
 User login
 JWT authentication
 Password hashing
 Image upload
 OCR processing
 Ingredient extraction
 PostgreSQL integration
 Scan history
 Allergy profile
 Ingredient normalization
 Allergen matching
 Synonym support
 Indian ingredient support
Future
 1,000+ verified ingredients
 40+ allergen categories
 Improved OCR
 Barcode scanning
 Multilingual labels
 Advanced personalized risk scoring
 Mobile application
 Smart shopping assistant
 Product comparison
 Allergy notifications
 Analytics dashboard
⚠️ Safety Disclaimer

AllergyShield AI is an assistive food-label analysis tool and is not a medical diagnostic system.

OCR errors, incomplete labels, manufacturing cross-contamination, and undisclosed ingredients may affect results.

Users with severe allergies should always verify official product information and follow appropriate medical guidance.

👨‍💻 Author
Ragul AR

Artificial Intelligence & Machine Learning

Creator and developer of AllergyShield AI.

⭐ Support

If you find the project useful:

⭐ Star the repository
🍴 Fork the project
🐛 Report issues
💡 Suggest improvements
🔧 Submit pull requests
