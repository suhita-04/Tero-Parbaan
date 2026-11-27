from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict

class AdminUserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "STAFF"
    is_active: bool = True

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserOut(AdminUserBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
