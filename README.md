Markdown# 🛡️ AllergyShield AI

> **Intelligent Food Label Analysis & Personalized Allergen Detection**
> 
> *Scan. Detect. Understand. Stay Safe.*

AllergyShield AI is an AI-assisted food safety platform that analyzes packaged-food ingredient labels and identifies potential allergens. It combines OCR, ingredient normalization, an expandable allergen knowledge base, personalized allergy profiles, authentication, and scan history.

---

## 🚀 Key Features

* **📷 Food Ingredient Label Scanning:** Easily upload images of packaged food labels.
* **🔍 OCR-Based Ingredient Extraction:** Automatically reads text from physical labels.
* **🧠 Ingredient & Allergen Matching:** Maps extracted terms against risk databases.
* **🔄 Ingredient Synonym Support:** Recognizes multiple terms for the same base ingredient.
* **🧪 Category & Severity Detection:** Classifies risks by allergen group and severity level.
* **👤 Personalized Allergy Profiles:** Tailwind alerts specifically to individual user sensitivities.
* **🔐 JWT-Based Authentication:** Secure registration, login, and session handling.
* **📋 User Scan History:** Track and revisit previous label scans anytime.
* **🇮🇳 Indian Ingredient Support:** Recognizes common regional food terms (e.g., *besan, atta, paneer*).
* **🌍 International Terminology Support:** Handles global food additives and technical names.
* **📊 Personalized Risk Analysis:** Generates immediate safety evaluations tailored to the user.
* **🎨 Animated Responsive Frontend:** Modern UI powered by Framer Motion and GSAP.

---

## 🔬 How It Works

```text
Food Label ──> Image Upload ──> OCR ──> Text Cleaning ──> Ingredient Normalization
                                                                   │
Safety Result <── Personalized Risk Analysis <── Allergen Knowledge Base
Example Normalization EngineRaw Extracted TextNormalized IngredientCategory / Allergen MatchedSoy LecithinSoyPotential Allergen (Soy)WheyMilk / DairyPotential Allergen (Dairy)🧠 Ingredient Knowledge BaseThe system is designed to support an expandable knowledge base containing:1,000+ ingredient names40+ allergen categoriesIngredient synonyms & scientific namesFood additive identifiers (E-numbers)Indian ingredient names & international terminologySeverity classification flagsJSON{
  "ingredient": "whey",
  "allergen": "milk",
  "category": "dairy",
  "severity": "high"
}
🇮🇳 Indian Ingredient SupportThe knowledge base natively maps commonly used regional ingredients:atta • maida • suji • rava • besan • paneer • ghee • dahi • lassi • poha • murmura • ragi • jowar • bajra • rajma • moong • urad • toor • chana • hing • jeera • ajwain • elaichi • haldi • imli • sabudana🏗️ ArchitecturePlaintext                     ┌──────────────────┐
                     │       USER       │
                     └────────┬─────────┘
                              │
                              ▼
                    React + Vite Frontend
                              │
                           REST API
                              │
                              ▼
                       FastAPI Backend
                              │
             ┌────────────────┼────────────────┐
             ▼                ▼                ▼
        OCR Engine     Knowledge Base     PostgreSQL
             └────────────────┼────────────────┘
                              ▼
                        Risk Analysis
                              │
                              ▼
                        Safety Results
🛠️ Technology StackFrontendCore: React, Vite, JavaScriptRouting & HTTP: React Router, AxiosAnimations: Framer Motion, GSAPIcons: Lucide / React IconsBackendFramework: Python, FastAPI, UvicornDatabase Management: SQLAlchemy, PostgreSQLSecurity & Auth: Pydantic, JWT, Passlib / bcryptAI & OCROCR-based text extraction & normalizationRule-based allergen detection and knowledge base matchingDeploymentFrontend: VercelBackend & DB: Cloud hosting (FastAPI) + Managed PostgreSQL📁 Project StructurePlaintextAllergyShield-AI/
│
├── backend/            # FastAPI application, database schemas, and API routes
├── frontend/           # React + Vite user interface and components
├── ml/                 # OCR processing modules and normalization logic
├── docs/               # Documentation assets
├── requirements.txt    # Python dependencies
└── README.md           # Project documentation
🚀 Run LocallyPrerequisitesPython 3.xNode.js & npmPostgreSQLGit1. Clone the RepositoryBashgit clone [https://github.com/ragul-1021/AllergyShield-AI.git](https://github.com/ragul-1021/AllergyShield-AI.git)
cd AllergyShield-AI
2. Backend SetupBashcd backend
python -m venv myenv

# On Windows
myenv\Scripts\activate

# On macOS/Linux
source myenv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start local server
uvicorn app.main:app --reload
3. Frontend SetupOpen a new terminal window:Bashcd frontend
npm install
npm run dev
For production builds:Bashnpm run build
🔑 Environment VariablesCreate a .env file in your root/backend/frontend directories using .env.example as a template.Code snippetVITE_API_URL=[http://127.0.0.1:8000](http://127.0.0.1:8000)
⚠️ Security Warning: Never commit .env, .env.local, or sensitive credentials (Database passwords, JWT secrets, API keys) to version control.🍴 Fork & RunTo run your own independent instance:Fork the repo on GitHub, then clone your fork:Bashgit clone [https://github.com/YOUR_USERNAME/AllergyShield-AI.git](https://github.com/YOUR_USERNAME/AllergyShield-AI.git)
cd AllergyShield-AI
Set up the frontend and backend following the local setup instructions above.Ensure you configure your own database connection and environment variables.🌐 DeploymentFrontend (Vercel):Root Directory: frontendBuild Command: npm run buildOutput Directory: distBackend: Deploy the FastAPI backend on your choice of cloud platform and attach production environment variables.Database: Connect a managed PostgreSQL instance.📈 RoadmapCompleted ✅[x] User registration & login with JWT authentication & password hashing[x] Label image upload & OCR text extraction[x] PostgreSQL integration & user scan history tracking[x] Allergy profile customization[x] Ingredient normalization, synonym matching & allergen detection[x] Indian ingredient supportFuture Vision 🔮[ ] Expansion to 1,000+ verified ingredients and 40+ categories[ ] Barcode scanning & multilingual label processing[ ] Advanced personalized risk scoring engine[ ] Dedicated mobile application[ ] Smart shopping assistant & product comparisons[ ] Custom allergy notifications & analytics dashboard⚠️ Safety DisclaimerAllergyShield AI is an assistive food-label analysis tool and is not a medical diagnostic system.OCR errors, incomplete packaging labels, cross-contamination warnings, and undisclosed ingredients may affect detection accuracy. Users with severe or life-threatening allergies should always manually verify official product information and consult medical professionals.👨‍💻 AuthorRagul ARArtificial Intelligence & Machine LearningCreator and developer of AllergyShield AI.⭐ SupportIf you find this project useful, feel free to support it!🌟 Star the repository🍴 Fork the project🐛 Report issues & submit PRs
