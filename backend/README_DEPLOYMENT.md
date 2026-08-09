# AllergyShield AI - Deployment Guide

## Backend Deployment (Heroku/Render/Railway)

### Prerequisites
- Python 3.13
- PostgreSQL database (or use SQLite for development)
- Cloud account (Heroku/Render/Railway)

### Step 1: Prepare Environment Variables
Create `.env` file with:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
SECRET_KEY=your-long-random-secret-key
CORS_ORIGINS=https://your-frontend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
```

### Step 2: Deploy to Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create allergyshield-ai-backend

# Set environment variables
heroku config:set DATABASE_URL=postgresql://...
heroku config:set SECRET_KEY=your-secret-key
heroku config:set CORS_ORIGINS=https://your-frontend-domain.com
heroku config:set FRONTEND_URL=https://your-frontend-domain.com

# Deploy
git init
git add .
git commit -m "Initial commit"
heroku git:remote -a allergyshield-ai-backend
git push heroku main

# Scale up
heroku ps:scale web=1
```

### Step 3: Deploy to Render (Alternative)
1. Go to render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6. Add environment variables
7. Deploy

## Frontend Deployment (Vercel/Netlify)

### Step 1: Update API URL
Edit `frontend/frontend/src/api/axios.js`:
```javascript
const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'https://your-backend-domain.com',
  withCredentials: true,
});
```

### Step 2: Deploy to Vercel
```bash
cd frontend/frontend
npm install
npm run build
vercel
```

### Step 3: Deploy to Netlify
```bash
cd frontend/frontend
npm install
npm run build
# Drag and drop the 'dist' folder to Netlify
```

## Database Setup (PostgreSQL)
For production, use PostgreSQL:
1. Create database on Heroku/Render/Railway
2. Get connection string
3. Set DATABASE_URL environment variable
4. Run migrations on first deploy

## Production Checklist
- [ ] Set strong SECRET_KEY
- [ ] Use PostgreSQL (not SQLite)
- [ ] Configure CORS for production domain
- [ ] Set up SMTP for email (optional)
- [ ] Enable HTTPS
- [ ] Test all API endpoints
- [ ] Test file upload (OCR)
- [ ] Test authentication flow
