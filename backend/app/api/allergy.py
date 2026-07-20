from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.schemas.allergy import AllergyRequest
from app.models.allergy import Allergy
from app.services.allergy_checker import master

router = APIRouter()

KNOWN_ALLERGENS = {
    str(name).strip().lower(): str(name).strip()
    for name in master["allergen"].dropna().unique()
    if str(name).strip().lower() not in {"", "none", "nan"}
}

@router.post("/my-allergies")
def save_allergies(
    request: AllergyRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    current_user.allergies.clear()
    for allergy_name in request.allergies:
        normalized_name = allergy_name.strip()
        if not normalized_name:
            continue

        canonical_name = KNOWN_ALLERGENS.get(
            normalized_name.lower(),
            normalized_name.title()
        )

        allergy = db.query(Allergy).filter(
            func.lower(Allergy.name) == canonical_name.lower()
        ).first()

        if not allergy:
            allergy = Allergy(name=canonical_name)
            db.add(allergy)
            db.flush()

        current_user.allergies.append(allergy)

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Allergies saved successfully",
        "allergies": [a.name for a in current_user.allergies]
    }

@router.get("/my-allergies")
def get_allergies(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return {
        "allergies": [a.name for a in current_user.allergies]
    }
