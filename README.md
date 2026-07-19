# AllergyShield AI

## Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Set these environment variables in production:

- `DATABASE_URL`
- `SECRET_KEY`
- `CORS_ORIGINS`
- `FRONTEND_URL`
- `SMTP_EMAIL`
- `SMTP_PASSWORD`
- `SMTP_SERVER`
- `SMTP_PORT`

## Frontend

```bash
cd frontend/frontend
npm install
npm run build
```

Set `VITE_API_BASE_URL` to the deployed backend URL.

## Deploy

Deploy the backend as a Docker web service from the `backend` folder. The Dockerfile installs the native barcode dependency required by `pyzbar`.

Set `DATABASE_URL`, `SECRET_KEY`, `CORS_ORIGINS`, and `FRONTEND_URL` in the hosting dashboard.

For Render Postgres, copy the database **External Database URL** or **Internal Database URL** as the value of `DATABASE_URL`. Do not use placeholder text and do not wrap the URL in quotes.

Deploy the frontend as a static site from `frontend/frontend` with:

```bash
npm install
npm run build
```

Use `dist` as the publish directory.
