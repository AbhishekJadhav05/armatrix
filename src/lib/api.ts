import { API_BASE_URL } from "_constants/ui";
import type {
  TeamMember,
  TeamMemberCreate,
  TeamMemberUpdate,
  ApiHealthResponse,
} from "_types/team";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body: unknown = await res
      .json()
      .catch(() => ({ detail: "Unknown error" }));
    const detail =
      (body as { detail?: string }).detail ?? `HTTP ${res.status}`;
    throw new Error(detail);
  }
  return res.json() as Promise<T>;
}

export const api = {
  health: (): Promise<ApiHealthResponse> =>
    request<ApiHealthResponse>("/api/health"),

  getTeam: (): Promise<TeamMember[]> =>
    request<TeamMember[]>("/api/team"),

  getMember: (id: string): Promise<TeamMember> =>
    request<TeamMember>(`/api/team/${id}`),

  createMember: (data: TeamMemberCreate): Promise<TeamMember> =>
    request<TeamMember>("/api/team", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateMember: (id: string, data: TeamMemberUpdate): Promise<TeamMember> =>
    request<TeamMember>(`/api/team/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteMember: (id: string): Promise<void> =>
    request<void>(`/api/team/${id}`, { method: "DELETE" }),
};
