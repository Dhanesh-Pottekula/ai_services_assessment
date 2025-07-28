from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LLMBase(BaseModel):
    name: str
    model: str
    provider: str
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    temperature: float = 0.7
    max_tokens: float = 1000

class LLMCreate(LLMBase):
    pass

class LLMUpdate(BaseModel):
    name: Optional[str] = None
    model: Optional[str] = None
    provider: Optional[str] = None
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    temperature: Optional[float] = None
    max_tokens: Optional[float] = None

class LLM(LLMBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 