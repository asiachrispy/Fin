from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.models.database import get_db
from app.models.models import Company
from app.services.openai_service import auto_fill_company_info

router = APIRouter(prefix="/companies", tags=["companies"])


@router.get("/")
async def get_companies(db: Session = Depends(get_db)):
    """
    Get all companies.
    """
    companies = db.query(Company).all()

    return [
        {
            "id": company.id,
            "name": company.name,
            "industry": company.industry,
            "businessDescription": company.business_description,
            "mainMarkets": company.main_markets,
            "competitors": company.competitors,
            "createdAt": company.created_at.isoformat(),
            "updatedAt": company.updated_at.isoformat()
        }
        for company in companies
    ]


@router.post("/")
async def create_company(
    company_data: dict,
    db: Session = Depends(get_db)
):
    """
    Create a new company.
    """
    # Check if company already exists
    existing = db.query(Company).filter(Company.name == company_data.get("name")).first()
    if existing:
        raise HTTPException(status_code=400, detail="Company already exists")

    # Create new company
    new_company = Company(
        id=str(uuid.uuid4()),
        name=company_data.get("name"),
        industry=company_data.get("industry"),
        business_description=company_data.get("businessDescription"),
        main_markets=company_data.get("mainMarkets"),
        competitors=company_data.get("competitors")
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return {
        "id": new_company.id,
        "name": new_company.name,
        "industry": new_company.industry,
        "businessDescription": new_company.business_description,
        "mainMarkets": new_company.main_markets,
        "competitors": new_company.competitors,
        "createdAt": new_company.created_at.isoformat(),
        "updatedAt": new_company.updated_at.isoformat()
    }


@router.put("/{company_id}")
async def update_company(
    company_id: str,
    company_data: dict,
    db: Session = Depends(get_db)
):
    """
    Update a company.
    """
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    # Update fields
    if "name" in company_data:
        company.name = company_data["name"]
    if "industry" in company_data:
        company.industry = company_data["industry"]
    if "businessDescription" in company_data:
        company.business_description = company_data["businessDescription"]
    if "mainMarkets" in company_data:
        company.main_markets = company_data["mainMarkets"]
    if "competitors" in company_data:
        company.competitors = company_data["competitors"]

    db.commit()
    db.refresh(company)

    return {
        "id": company.id,
        "name": company.name,
        "industry": company.industry,
        "businessDescription": company.business_description,
        "mainMarkets": company.main_markets,
        "competitors": company.competitors,
        "createdAt": company.created_at.isoformat(),
        "updatedAt": company.updated_at.isoformat()
    }


@router.delete("/{company_id}")
async def delete_company(company_id: str, db: Session = Depends(get_db)):
    """
    Delete a company.
    """
    company = db.query(Company).filter(Company.id == company_id).first()

    if not company:
        raise HTTPException(status_code=404, detail="Company not found")

    db.delete(company)
    db.commit()

    return {"message": "Company deleted successfully"}


@router.get("/auto-fill")
async def get_company_info(name: str = Query(...)):
    """
    Auto-fill company information using AI.
    """
    company_info = await auto_fill_company_info(name)

    if not company_info:
        raise HTTPException(status_code=404, detail="Could not retrieve company information")

    return company_info
