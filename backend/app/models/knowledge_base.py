from sqlalchemy import Column, String, Integer, DateTime, Text, Enum
from sqlalchemy.sql import func
import enum
from app.db.database import Base

class KnowledgeBaseType(str, enum.Enum):
    VECTOR = "vector"
    DOCUMENT = "document"
    DATABASE = "database"

class KnowledgeBase(Base):
    __tablename__ = "knowledge_bases"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    type = Column(Enum(KnowledgeBaseType), nullable=False)
    source = Column(String, nullable=False)
    connection_string = Column(Text, nullable=True)
    api_key = Column(Text, nullable=True)
    index_name = Column(String, nullable=True)
    embedding_model = Column(String, nullable=True)
    chunk_size = Column(Integer, default=1000)
    chunk_overlap = Column(Integer, default=200)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 