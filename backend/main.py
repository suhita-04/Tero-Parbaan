from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.api.v1.endpoints import products, orders
from app.db.base import Base
from app.db.session import engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Try to create tables if they don't exist yet (safe fallback alongside Alembic)
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"[Warning] Could not auto-create tables at startup (Check database connection): {e}")
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Tero Parbon - High-end Boutique Ethnic Fashion",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan
)

# Setup CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Primary v1 API routes (/api/v1/...)
app.include_router(api_router, prefix=settings.API_V1_STR)

# Root-level direct route mounts for direct frontend consumption:
# GET /products, GET /products/{id}, POST /orders
app.include_router(products.router, prefix="/products", tags=["Storefront Products (Direct)"])
app.include_router(orders.router, prefix="/orders", tags=["Storefront Orders (Direct)"])

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok", "app": settings.PROJECT_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
