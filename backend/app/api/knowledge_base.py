from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.db.database import get_db
from app.models.knowledge_base import KnowledgeBase as KnowledgeBaseModel
from app.schemas.knowledge_base import KnowledgeBase, KnowledgeBaseCreate, KnowledgeBaseUpdate

router = APIRouter()

@router.get("/details", response_model=KnowledgeBase)
def get_knowledge_base_details(db: Session = Depends(get_db)):
    """Get Knowledge Base configuration details"""
    kb_config = db.query(KnowledgeBaseModel).first()
    if not kb_config:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Knowledge Base configuration not found"
        )
    return kb_config

@router.put("/details", response_model=KnowledgeBase)
def update_knowledge_base_details(kb_update: KnowledgeBaseUpdate, db: Session = Depends(get_db)):
    """Update Knowledge Base configuration details"""
    kb_config = db.query(KnowledgeBaseModel).first()
    
    if not kb_config:
        # Create new KB config if none exists
        kb_config = KnowledgeBaseModel(
            id=str(uuid.uuid4()),
            name=kb_update.name or "Default Knowledge Base",
            description=kb_update.description or "Default knowledge base configuration",
            type=kb_update.type or "vector",
            source=kb_update.source or "local",
            chunk_size=kb_update.chunk_size or 1000,
            chunk_overlap=kb_update.chunk_overlap or 200
        )
        db.add(kb_config)
    else:
        # Update existing config
        update_data = kb_update.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(kb_config, field, value)
    
    db.commit()
    db.refresh(kb_config)
    return kb_config

@router.post("/details", response_model=KnowledgeBase, status_code=status.HTTP_201_CREATED)
def create_knowledge_base_details(kb: KnowledgeBaseCreate, db: Session = Depends(get_db)):
    """Create new Knowledge Base configuration"""
    # Check if config already exists
    existing_config = db.query(KnowledgeBaseModel).first()
    if existing_config:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Knowledge Base configuration already exists. Use PUT to update."
        )
    
    db_kb = KnowledgeBaseModel(
        id=str(uuid.uuid4()),
        name=kb.name,
        description=kb.description,
        type=kb.type,
        source=kb.source,
        connection_string=kb.connection_string,
        api_key=kb.api_key,
        index_name=kb.index_name,
        embedding_model=kb.embedding_model,
        chunk_size=kb.chunk_size,
        chunk_overlap=kb.chunk_overlap
    )
    db.add(db_kb)
    db.commit()
    db.refresh(db_kb)
    return db_kb