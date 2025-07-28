from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class StackBase(BaseModel):
    name: str
    description: Optional[str] = None

class StackCreate(StackBase):
    pass

class StackUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class Stack(StackBase):
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True 