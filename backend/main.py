from __future__ import annotations
import os
import uuid
from datetime import datetime, timezone

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from models import TeamMember, TeamMemberCreate, TeamMemberUpdate
from data import MEMBERS_DB

load_dotenv()

app = FastAPI(title="Armatrix Team API", version="1.0.0")

_raw_origins: str = os.getenv("ALLOWED_ORIGINS", "*")
origins: list[str] = (
    ["*"] if _raw_origins == "*" else [o.strip() for o in _raw_origins.split(",")]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}


@app.get("/api/team", response_model=list[TeamMember])
def get_team() -> list[TeamMember]:
    members = list(MEMBERS_DB.values())
    return sorted(members, key=lambda m: (not m.is_founder, m.joined_date))


@app.get("/api/team/department/{dept}", response_model=list[TeamMember])
def get_by_department(dept: str) -> list[TeamMember]:
    filtered = [m for m in MEMBERS_DB.values() if m.department.lower() == dept.lower()]
    if not filtered:
        raise HTTPException(
            status_code=404, detail=f"No members found in department '{dept}'"
        )
    return sorted(filtered, key=lambda m: (not m.is_founder, m.joined_date))


@app.get("/api/team/{member_id}", response_model=TeamMember)
def get_member(member_id: str) -> TeamMember:
    member = MEMBERS_DB.get(member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member


@app.post("/api/team", response_model=TeamMember, status_code=status.HTTP_201_CREATED)
def create_member(payload: TeamMemberCreate) -> TeamMember:
    new_member = TeamMember(
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc),
        **payload.model_dump(),
    )
    MEMBERS_DB[new_member.id] = new_member
    return new_member


@app.patch("/api/team/{member_id}", response_model=TeamMember)
def update_member(member_id: str, payload: TeamMemberUpdate) -> TeamMember:
    member = MEMBERS_DB.get(member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    updated_data = member.model_dump()
    updated_data.update(payload.model_dump(exclude_unset=True))
    updated_member = TeamMember(**updated_data)
    MEMBERS_DB[member_id] = updated_member
    return updated_member


@app.delete("/api/team/{member_id}")
def delete_member(member_id: str) -> dict[str, str]:
    if member_id not in MEMBERS_DB:
        raise HTTPException(status_code=404, detail="Member not found")
    del MEMBERS_DB[member_id]
    return {"message": "deleted"}
