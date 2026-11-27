from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

class OrderItemCreate(BaseModel):
    product_id: Optional[int] = None
    variation_id: Optional[int] = None
    product_title: Optional[str] = None
    size: Optional[str] = None
    color: Optional[str] = None
    unit_price: Optional[float] = None
    quantity: int = Field(default=1, ge=1)

class OrderItemOut(BaseModel):
    id: int
    order_id: int
    product_id: Optional[int] = None
    variation_id: Optional[int] = None
    product_title: str
    size: Optional[str] = None
    color: Optional[str] = None
    unit_price: float
    quantity: int
    subtotal: float

    model_config = ConfigDict(from_attributes=True)


class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=150)
    phone: str = Field(..., min_length=5, max_length=30)
    address: str = Field(..., min_length=5)
    total_amount: Optional[float] = None
    payment_method: str = "Cash on Delivery"
    items: List[OrderItemCreate] = []

class OrderOut(BaseModel):
    id: int
    customer_name: str
    phone: str
    address: str
    total_amount: float
    order_status: str
    payment_method: str
    created_at: datetime
    updated_at: datetime
    items: List[OrderItemOut] = []

    model_config = ConfigDict(from_attributes=True)
