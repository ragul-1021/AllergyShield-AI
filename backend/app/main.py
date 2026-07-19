from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from app.database.database import Base,engine
from app.models.user import User
from app.api.auth import router as auth_router
from app.api.scan import router as scan_router
from app.models.scan_history import ScanHistory
from app.api.allergy import router as allergy_router
from app.models.allergy import Allergy
from app.api.barcode import router as barcode_router
from app.api.dashboard import router as dashboard_router

app = FastAPI()

allowed_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174"
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router,tags=["Dashboard"])
app.include_router(barcode_router, tags=["Barcode"])
app.include_router(allergy_router,prefix="/allergy",tags=["Allergies"])
app.include_router(auth_router,prefix="/auth",tags=["Authentication"])
app.include_router(scan_router,tags=["OCR"])
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {
        "message" :"Welcome to AllergyShield-AI"
    }
