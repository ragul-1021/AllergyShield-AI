from fastapi import APIRouter, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database.database import get_db
from app.models import scan_history
from app.api.auth import get_current_user
from app.models.user import User
from app.models.scan_history import ScanHistory
from app.services.allergy_checker import detect_allergens,find_unknown_ingredients

import shutil
import os
import tempfile
from pathlib import Path
from uuid import uuid4

from app.utils.text_cleaner import clean_text
from app.services.ocr_services import extract_txt
from app.services.allergy_explanation import ALLERGY_EXPLANATIONS
from app.services.recommendations import RECOMMENDATIONS
from app.services import recommendations
from app.services.risk_scoring import calculate_risk_details
router = APIRouter()

@router.post("/scan")

def scan_label(file : UploadFile = File(...), db : Session = Depends(get_db),current_user : User = Depends(get_current_user)):
    content_type = (file.content_type or "").lower()
    if content_type and not content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Please upload an image file.")

    upload_dir = Path(tempfile.gettempdir()) / "allergyshield_uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)

    suffix = Path(file.filename or "").suffix.lower() or ".jpg"
    file_path = upload_dir / f"{uuid4().hex}{suffix}"

    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        extracted_txt = extract_txt(str(file_path))
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"OCR failed while reading the image: {exc}",
        ) from exc

    if not extracted_txt.strip():
        raise HTTPException(
            status_code=422,
            detail="No readable ingredient text was found. Try a clearer, brighter label image.",
        )

    cleaned_txt = clean_text(extracted_txt)
    
    detected_allergens = detect_allergens(cleaned_txt)
    detected_allergens = detect_allergens(cleaned_txt)

    all_detected_allergens = ", ".join(
        sorted(
        {
            str(item["allergen"]).strip()
            for item in detected_allergens
            if str(item["allergen"]).strip().lower() not in ["none", "nan", ""]
        }
            )
        )
    
    unknown_ingredients = find_unknown_ingredients(cleaned_txt)
    
    user_allergies = {
        str(allergy.name).strip().lower()
        for allergy in current_user.allergies
    }

    filtered_allergens = []
    seen_allergen_names = set()

    for item in detected_allergens:
        allergen_name = str(item["allergen"]).strip()
        allergen_key = allergen_name.lower()
        if allergen_key in user_allergies and allergen_key not in seen_allergen_names:
            filtered_allergens.append(item)
            seen_allergen_names.add(allergen_key)
    for item in filtered_allergens:
        item["reason"] = ALLERGY_EXPLANATIONS.get(
            item["allergen"],
            "No explanation available."
    ) 
    allergen_names = ", ".join(
    sorted(
        set(
            str(item["allergen"]).strip()
            for item in filtered_allergens
            if str(item["allergen"]).strip().lower() not in [None,"None","none", "nan", ""]
            )
        )
    )       
    risk_score, risk_level = calculate_risk_details(filtered_allergens)

    if len(filtered_allergens) > 0:
        status = "Unsafe"
    else:
        status = "Safe"
    if filtered_allergens:
        message = "⚠️ This product contains ingredients matching your saved allergies."
    else:
        message = "✅ This product does not contain your saved allergens."
    if status == "Unsafe":
        recommendation = "Avoid consuming this product."
    else:
        recommendation = "This product appears safe based on your saved allergies."
    recommendations = []

    for item in filtered_allergens:

        recommendation = RECOMMENDATIONS.get(
            item["allergen"],
            "Consult your doctor before consuming this product."
        )

        recommendations.append(recommendation)    
    recommendations = list(set(recommendations))
    if status == "Safe":
        recommendations = [
        "This product appears safe based on your saved allergies."
            ]
    new_scan = ScanHistory(
    user_id=current_user.id,
    image_path=str(file_path),
    extracted_text=cleaned_txt,
    status=status,
    detected_allergens=all_detected_allergens
)
    
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)
    return {
    "filename": file.filename,
    "ingredients": cleaned_txt,
    "status": status,
    "detected_allergens": all_detected_allergens,
    "matched_allergens": filtered_allergens,
    "unknown_ingredients": unknown_ingredients,
    "risk_score": risk_score,
    "risk_level": risk_level,
    "recommendations": recommendations
}
    
    





