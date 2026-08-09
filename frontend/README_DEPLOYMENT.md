# AllergyShield AI Frontend - Deployment Guide

## Prerequisites
- Node.js 18+
- Backend API URL (from backend deployment)

## Step 1: Configure API URL
Create `.env` file in frontend/frontend directory:
```
VITE_API_BASE_URL=https://your-backend-domain.com
```

## Step 2: Build for Production
```bash
cd frontend/frontend
npm install
npm run build
```

## Step 3: Deploy to Vercel (Recommended)

### Option A: Via Vercel CLI
```bash
npm install -g vercel
cd frontend/frontend
vercel
```

### Option B: Via Vercel Dashboard
1. Go to vercel.com
2. Import repository
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_API_BASE_URL=https://your-backend-domain.com`
6. Deploy

## Step 4: Deploy to Netlify (Alternative)

### Option A: Drag and Drop
```bash
npm run build
# Drag the 'dist' folder to Netlify dashboard
```

### Option B: Netlify CLI
```bash
npm install -g netlify-cli
cd frontend/frontend
npm run build
netlify deploy --prod --dir=dist
```

## Step 5: Deploy to GitHub Pages (Free)
```bash
npm run build
# Upload 'dist' folder to GitHub repository
# Configure GitHub Pages to serve from 'dist' folder
```

## Configuration Files

### vercel.json (optional)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_BASE_URL": "https://your-backend-domain.com"
  }
}
```

### netlify.toml (optional)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Production Checklist
- [ ] Set VITE_API_BASE_URL to backend URL
- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Verify API calls work in production
- [ ] Test authentication flow
- [ ] Test file upload (OCR)
- [ ] Test scan history
- [ ] Test dashboard
- [ ] Enable HTTPS (automatic on Vercel/Netlify)
