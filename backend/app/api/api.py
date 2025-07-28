from fastapi import APIRouter
from app.api.stacks import router as stacks_router
from app.api.llm import router as llm_router
from app.api.knowledge_base import router as knowledge_base_router

api_router = APIRouter()

# Include all API routers
api_router.include_router(stacks_router, prefix="/stacks", tags=["stacks"])
api_router.include_router(llm_router, prefix="/llm", tags=["llm"])
api_router.include_router(knowledge_base_router, prefix="/knowledge-base", tags=["knowledge-base"]) 