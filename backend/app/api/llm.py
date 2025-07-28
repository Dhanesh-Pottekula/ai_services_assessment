from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.db.database import get_db
from app.models.llm import LLM as LLMModel
from app.schemas.llm import LLM, LLMCreate, LLMUpdate

router = APIRouter()

@router.get("/details", response_model=LLM)
def get_llm_details(db: Session = Depends(get_db)):
    """Get LLM configuration details"""
    llm_config = db.query(LLMModel).first()
    if not llm_config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="LLM configuration not found"
        )
    return llm_config

@router.put("/details", response_model=LLM)
def update_llm_details(llm_update: LLMUpdate, db: Session = Depends(get_db)):
    """Update LLM configuration details"""
    llm_config = db.query(LLMModel).first()
    
    if not llm_config:
        # Create new LLM config if none exists
        llm_config = LLMModel(
            id=str(uuid.uuid4()),
            name=llm_update.name or "Default LLM",
            model=llm_update.model or "gpt-3.5-turbo",
            provider=llm_update.provider or "openai",
            temperature=llm_update.temperature or 0.7,
            max_tokens=llm_update.max_tokens or 1000
        )
        db.add(llm_config)
    else:
        # Update existing config
        update_data = llm_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(llm_config, field, value)
    
    db.commit()
    db.refresh(llm_config)
    return llm_config

@router.post("/details", response_model=LLM, status_code=status.HTTP_201_CREATED)
def create_llm_details(llm: LLMCreate, db: Session = Depends(get_db)):
    """Create new LLM configuration"""
    # Check if config already exists
    existing_config = db.query(LLMModel).first()
    if existing_config:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="LLM configuration already exists. Use PUT to update."
        )
    
    db_llm = LLMModel(
        id=str(uuid.uuid4()),
        name=llm.name,
        model=llm.model,
        provider=llm.provider,
        api_key=llm.api_key,
        base_url=llm.base_url,
        temperature=llm.temperature,
        max_tokens=llm.max_tokens
    )
    db.add(db_llm)
    db.commit()
    db.refresh(db_llm)
    return db_llm