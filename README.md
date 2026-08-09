# 🛡️ AllergyShield AI

### Intelligent Food Label Analysis & Personalized Allergen Detection

> **Scan. Detect. Understand. Stay Safe.**

AllergyShield AI is an AI-assisted food safety platform that analyzes packaged-food ingredient labels and identifies potential allergens.

It combines **OCR, ingredient normalization, an expandable allergen knowledge base, personalized allergy profiles, authentication, and scan history** to make complex food labels easier to understand.

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

Example
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

```
🧠 Ingredient Knowledge Base

The system is designed to support an expandable ingredient knowledge base containing:

1,000+ ingredient names
40+ allergen categories
Ingredient synonyms
Scientific names
Food additive identifiers
Indian ingredient names
International terminology
Severity information
Example
```

{
  "ingredient": "whey",
  "allergen": "milk",
  "category": "dairy",
  "severity": "high"
}
```
🇮🇳 Indian Ingredient Support

The knowledge base can include commonly used Indian ingredients such as:

```

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

```

The ingredient database can be continuously expanded with verified Indian ingredients, regional terminology, and food-product information.

🏗️ Architecture

                         USER
                           │
                           ▼
                 ┌───────────────────┐
                 │ React + Vite      │
                 │    Frontend       │
                 └─────────┬─────────┘
                           │
                        REST API
                           │
                           ▼
                 ┌───────────────────┐
                 │     FastAPI       │
                 │     Backend       │
                 └─────────┬─────────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          ┌─────┐    ┌───────────┐  ┌───────────┐
          │ OCR │    │ Allergen  │  │ PostgreSQL│
          │     │    │ Knowledge │  │  Database │
          └──┬──┘    │   Base    │  └─────┬─────┘
             │       └─────┬─────┘        │
             └─────────────┼──────────────┘
                           ▼
                  ┌─────────────────┐
                  │  Risk Analysis  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Safety Results  │
                  └─────────────────┘
                  
🛠️ Technology Stack

Frontend
Technology	Purpose
React	User interface
Vite	Frontend build tool
JavaScript	Application logic
React Router	Application routing
Axios	API communication
Framer Motion	UI animations
GSAP	Advanced animations
React Icons / Lucide	UI icons
Backend
Technology	Purpose
Python	Backend language
FastAPI	REST API framework
Uvicorn	ASGI server
SQLAlchemy	Database ORM
Pydantic	Data validation
JWT	Authentication
Passlib / bcrypt	Password hashing
Database
Technology	Purpose
PostgreSQL	Persistent data storage
SQLAlchemy ORM	Database interaction
AI / OCR
OCR-based text extraction
Text normalization
Ingredient knowledge base
Rule-based allergen detection
Personalized allergen matching
Deployment
Vercel for frontend
Cloud hosting for backend
PostgreSQL database


📁 Project Structure


AllergyShield-AI/
│
├── backend/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── ml/
│
├── docs/
│
├── requirements.txt
│
└── README.md


🚀 Run Locally
Prerequisites

Make sure you have installed:

Python 3.x
Node.js
npm
PostgreSQL
Git
1. Clone the Repository
git clone https://github.com/ragul-1021/AllergyShield-AI.git
cd AllergyShield-AI
⚙️ Backend Setup

Navigate to the backend:
```
cd backend
```

Create a virtual environment:
```
python -m venv myenv
```
Windows
```
myenv\Scripts\activate
```

Install dependencies:
```
pip install -r requirements.txt
```

Run the backend:
```
uvicorn app.main:app --reload
```

Backend will normally be available at:
```
http://127.0.0.1:8000
```

Swagger API documentation:
```

http://127.0.0.1:8000/docs
```

💻 Frontend Setup

Open another terminal.

Navigate to the frontend:
```

cd frontend
```

Install dependencies:
```

npm install
```
Start the development server:

```
npm run dev
```

Build for production:
```

npm run build
```

The frontend normally runs at:
```

http://localhost:5173
```

🔑 Environment Variables

Create your own .env file.

Example:

VITE_API_URL=http://127.0.0.1:8000

For production, replace the value with your deployed backend URL.

⚠️ Never commit these files if they contain secrets

.env
.env.local
.env.production
Never expose
Database passwords
JWT secrets
API keys
OAuth secrets
SMTP passwords
Production credentials
Private tokens

Use .env.example as a safe template.

Example:

VITE_API_URL=http://localhost:8000
DATABASE_URL=your_database_url_here
SECRET_KEY=your_secret_key_here
🍴 Fork & Run

Anyone can fork the project and create their own independent instance.

1. Fork the Repository

Click Fork on GitHub.

2. Clone Your Fork

Replace YOUR_USERNAME with your GitHub username:

git clone https://github.com/YOUR_USERNAME/AllergyShield-AI.git

cd AllergyShield-AI

3. Configure Environment Variables

Create your own environment files using .env.example as a reference.

Do not use production credentials from the original project.

4. Create Your Own Database

Each fork should use its own PostgreSQL database.

Example:

DATABASE_URL=your_own_postgresql_connection
5. Run the Frontend
```
cd frontend
npm install
npm run dev
```
6. Run the Backend

Open another terminal:
```
cd backend
python -m venv myenv
```

Windows:
```
myenv\Scripts\activate
```

Install dependencies:
```

pip install -r requirements.txt
```

Run:
```
uvicorn app.main:app --reload
```

Each fork should use its own database, environment variables, and deployment configuration.

🌐 Deployment

Frontend — Vercel

Recommended Vercel configuration:

Root Directory: frontend
Build Command: npm run build
Output Directory: dist

Make sure the required environment variables are configured in the Vercel project settings.

Backend

Deploy the FastAPI backend separately using a compatible Python hosting platform.

Configure all required production environment variables on the hosting platform.

Database

Use a PostgreSQL database for persistent application data.

Each independent deployment should use its own database.

📈 Roadmap
✅ Completed
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
 Responsive frontend
 Animated UI
 
🔮 Future

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

 
🧪 Example

Suppose a food label contains:

Ingredients:

Wheat flour, sugar, vegetable oil,
cocoa powder, soy lecithin,
may contain milk and peanuts

OCR extracts:

wheat flour
sugar
vegetable oil
cocoa powder
soy lecithin
milk
peanuts

The ingredient knowledge base identifies:

Wheat Flour
    ↓
Wheat

Soy Lecithin
    ↓
Soy

Milk
    ↓
Milk

Peanuts
    ↓
Peanut

Possible result:

Potential Allergens

🔴 Wheat
🔴 Soy
🔴 Milk
🔴 Peanut
📡 API Overview
Authentication
POST /auth/register
POST /auth/login
Food Scanning
POST /scan
Scan History
GET /history
User / Allergy Information
GET /profile
POST /profile

API endpoints may change as development continues.

🤝 Contributing

Contributions are welcome.

Fork the repository
Create a feature branch
Make your changes
Test locally
Run the production build
Commit your changes
Push your branch
Open a Pull Request

Create a feature branch:

git checkout -b feature/your-feature

Check your changes:

git status

Commit:

git add .
git commit -m "Add: your feature"

Push:

git push origin feature/your-feature

Before submitting a Pull Request, make sure:

npm run build

completes successfully and no sensitive credentials are included.

⚠️ Safety Disclaimer

AllergyShield AI is an assistive food-label analysis tool and is not a medical diagnostic system.

OCR errors, incomplete labels, manufacturing cross-contamination, and undisclosed ingredients may affect results.

Users with severe allergies should always verify official product information and follow appropriate medical guidance.

👨‍💻 Author

Ragul AR

Artificial Intelligence & Machine Learning

Creator and developer of AllergyShield AI.

⭐ Support

If you find AllergyShield AI useful:

⭐ Star the repository

🍴 Fork the project

🐛 Report issues

💡 Suggest improvements

🔧 Submit pull requests
