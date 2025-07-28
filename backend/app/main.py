from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.api import api_router
from app.db.init_db import init_db, init_db_async

app = FastAPI(
    title="AI Flow API",
    description="API for AI Flow application with LLM and Knowledge Base management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api")


@app.get("/")
async def root():
    return {"message": "AI Flow API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Service is running"}

@app.on_event("startup")
async def startup_event():
    # Initialize database
    await init_db_async()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 