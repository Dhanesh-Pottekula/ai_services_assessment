from sqlalchemy import Column, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.db.database import Base

class LLM(Base):
    __tablename__ = "llm_configs"
    
    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    model = Column(String, nullable=False)
    provider = Column(String, nullable=False)
    api_key = Column(Text, nullable=True)
    base_url = Column(String, nullable=True)
    temperature = Column(Float, default=0.7)
    max_tokens = Column(Float, default=1000)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 