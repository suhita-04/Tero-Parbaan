from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict

class VariationBase(BaseModel):
    size: str
    color: str
    stock_quantity: int = 0
    sku: Optional[str] = None
    price_adjustment: float = 0.0
    is_active: bool = True

class VariationCreate(VariationBase):
    pass

class VariationOut(VariationBase):
    id: int
    product_id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    base_price: float
    image_url: Optional[str] = None
    category: Optional[str] = "sarees"
    is_active: bool = True

class ProductCreate(ProductBase):
    variations: Optional[List[VariationCreate]] = []

class ProductOut(ProductBase):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    variations: List[VariationOut] = []

    model_config = ConfigDict(from_attributes=True)
