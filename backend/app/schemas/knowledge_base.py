from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.knowledge_base import KnowledgeBaseType

class KnowledgeBaseBase(BaseModel):
    name: str
    description: Optional[str] = None
    type: KnowledgeBaseType
    source: str
    connection_string: Optional[str] = None
    api_key: Optional[str] = None
    index_name: Optional[str] = None
    embedding_model: Optional[str] = None
    chunk_size: int = 1000
    chunk_overlap: int = 200

class KnowledgeBaseCreate(KnowledgeBaseBase):
    pass

class KnowledgeBaseUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    type: Optional[KnowledgeBaseType] = None
    source: Optional[str] = None
    connection_string: Optional[str] = None
    api_key: Optional[str] = None
    index_name: Optional[str] = None
    embedding_model: Optional[str] = None
    chunk_size: Optional[int] = None
    chunk_overlap: Optional[int] = None

class KnowledgeBase(KnowledgeBaseBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 