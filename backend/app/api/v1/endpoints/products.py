from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.product import Product, Variation
from app.schemas.product import ProductOut, ProductCreate

router = APIRouter()

@router.get("", response_model=List[ProductOut], summary="Fetch all products for the storefront")
@router.get("/", response_model=List[ProductOut], include_in_schema=False)
def get_products(
    category: Optional[str] = Query(None, description="Filter by category: sarees, kurtis, blouses"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Fetch all active products for the storefront, including their variations.
    """
    query = db.query(Product).filter(Product.is_active == True)
    if category:
        query = query.filter(Product.category.ilike(category))
    
    products = query.offset(skip).limit(limit).all()
    return products


@router.get("/{product_id}", response_model=ProductOut, summary="Fetch a single product's details")
def get_product(product_id: int, db: Session = Depends(get_db)):
    """
    Fetch a single product by ID, including its size/color variations and pricing.
    """
    product = db.query(Product).filter(
        Product.id == product_id,
        Product.is_active == True
    ).first()

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product with id {product_id} not found."
        )
    return product


@router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED, summary="Create a new product with variations")
@router.post("/", response_model=ProductOut, include_in_schema=False)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    """
    Helper endpoint to create a product with initial variations.
    """
    product = Product(
        title=product_in.title,
        description=product_in.description,
        base_price=product_in.base_price,
        image_url=product_in.image_url,
        category=product_in.category or "sarees",
        is_active=product_in.is_active
    )
    db.add(product)
    db.flush()

    if product_in.variations:
        for var_in in product_in.variations:
            variation = Variation(
                product_id=product.id,
                size=var_in.size,
                color=var_in.color,
                stock_quantity=var_in.stock_quantity,
                sku=var_in.sku,
                price_adjustment=var_in.price_adjustment,
                is_active=var_in.is_active
            )
            db.add(variation)

    db.commit()
    db.refresh(product)
    return product
