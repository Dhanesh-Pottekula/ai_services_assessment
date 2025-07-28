from sqlalchemy.orm import Session
from app.db.database import engine, Base
from app.models import stack, llm, knowledge_base

def init_db():
    """Initialize database tables"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

async def init_db_async():
    """Async version of database initialization"""
    init_db() 