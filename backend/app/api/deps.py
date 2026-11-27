from typing import Generator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

def get_current_user(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    # Dependency placeholder for JWT token validation
    pass

def get_current_active_admin(
    current_user = Depends(get_current_user)
):
    # Dependency placeholder for checking admin role
    pass
