from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter()

@router.get("/metrics")
def get_dashboard_metrics(db: Session = Depends(get_db)):
    """Summary metrics: revenue, order count, top products."""
    return {"message": "Admin metrics route initialized", "total_sales": 0, "total_orders": 0}

@router.post("/products", status_code=status.HTTP_201_CREATED)
def create_product(db: Session = Depends(get_db)):
    """Create a new product with variations."""
    return {"message": "Admin create product route initialized"}

@router.put("/products/{product_id}")
def update_product(product_id: int, db: Session = Depends(get_db)):
    """Update product and variation pricing/inventory."""
    return {"message": f"Admin update product {product_id}"}

@router.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Archive/delete a product."""
    return {"message": f"Admin delete product {product_id}"}

@router.get("/orders")
def list_all_orders(db: Session = Depends(get_db)):
    """List customer orders for fulfillment and status updates."""
    return {"message": "Admin list orders route initialized", "orders": []}
