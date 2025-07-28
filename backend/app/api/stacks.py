from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.db.database import get_db
from app.models.stack import Stack as StackModel
from app.schemas.stack import Stack, StackCreate, StackUpdate

router = APIRouter()

@router.get("/", response_model=List[Stack])
def get_stacks(db: Session = Depends(get_db)):
    """Get all stacks"""
    stacks = db.query(StackModel).all()
    return stacks

@router.post("/", response_model=Stack, status_code=status.HTTP_201_CREATED)
def create_stack(stack: StackCreate, db: Session = Depends(get_db)):
    """Create a new stack"""
    db_stack = StackModel(
        id=str(uuid.uuid4()),
        name=stack.name,
        description=stack.description
    )
    db.add(db_stack)
    db.commit()
    db.refresh(db_stack)
    return db_stack

@router.get("/{stack_id}", response_model=Stack)
def get_stack(stack_id: str, db: Session = Depends(get_db)):
    """Get a specific stack by ID"""
    stack = db.query(StackModel).filter(StackModel.id == stack_id).first()
    if not stack:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Stack not found"
        )
    return stack

@router.put("/{stack_id}", response_model=Stack)
def update_stack(stack_id: str, stack_update: StackUpdate, db: Session = Depends(get_db)):
    """Update a stack"""
    db_stack = db.query(StackModel).filter(StackModel.id == stack_id).first()
    if not db_stack:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Stack not found"
        )
    
    update_data = stack_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_stack, field, value)
    
    db.commit()
    db.refresh(db_stack)
    return db_stack

@router.delete("/{stack_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_stack(stack_id: str, db: Session = Depends(get_db)):
    """Delete a stack"""
    db_stack = db.query(StackModel).filter(StackModel.id == stack_id).first()
    if not db_stack:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Stack not found"
        )
    
    db.delete(db_stack)
    db.commit()
    return None