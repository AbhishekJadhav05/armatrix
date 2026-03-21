import type { Department } from "_enums/department";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: Department;
  bio: string;
  photo_url: string;
  linkedin_url: string | null;
  github_url: string | null;
  is_founder: boolean;
  joined_date: string; // "YYYY-MM"
  skills: string[];
  fun_fact: string | null;
  created_at: string; // ISO datetime string
}

export type TeamMemberCreate = Omit<TeamMember, "id" | "created_at">;
export type TeamMemberUpdate = Partial<TeamMemberCreate>;

export interface ApiHealthResponse {
  status: "ok";
  timestamp: string;
}

// Filter state — "All" or a specific Department
export type DeptFilter = Department | "All";

// Admin panel internal views
export type AdminView = "list" | "add" | { editing: TeamMember };
