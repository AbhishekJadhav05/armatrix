from __future__ import annotations
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_validator
import uuid

VALID_DEPARTMENTS = {"Leadership", "Engineering", "Research", "Operations", "Design"}


class TeamMemberBase(BaseModel):
    name: str
    role: str
    department: str
    bio: str
    photo_url: str
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    is_founder: bool = False
    joined_date: str  # "YYYY-MM" format
    skills: list[str]
    fun_fact: Optional[str] = None

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("name must not be empty")
        return v.strip()

    @field_validator("bio")
    @classmethod
    def bio_length(cls, v: str) -> str:
        if len(v) > 400:
            raise ValueError("bio must be 400 characters or fewer")
        return v

    @field_validator("department")
    @classmethod
    def valid_department(cls, v: str) -> str:
        if v not in VALID_DEPARTMENTS:
            raise ValueError(f"department must be one of {VALID_DEPARTMENTS}")
        return v

    @field_validator("joined_date")
    @classmethod
    def valid_joined_date(cls, v: str) -> str:
        parts = v.split("-")
        if len(parts) != 2 or not parts[0].isdigit() or not parts[1].isdigit():
            raise ValueError("joined_date must be in YYYY-MM format")
        return v


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    department: Optional[str] = None
    bio: Optional[str] = None
    photo_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    is_founder: Optional[bool] = None
    joined_date: Optional[str] = None
    skills: Optional[list[str]] = None
    fun_fact: Optional[str] = None


class TeamMember(TeamMemberBase):
    id: str
    created_at: datetime

    model_config = {"from_attributes": True}
