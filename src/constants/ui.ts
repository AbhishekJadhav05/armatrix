import { Department } from "_enums/department";

export const DEPT_COLORS: Record<Department, string> = {
  [Department.Leadership]: "#E8FF47",
  [Department.Engineering]: "#47C8FF",
  [Department.Research]: "#FF6B47",
  [Department.Operations]: "#A047FF",
  [Department.Design]: "#47FFB8",
};

export const API_BASE_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const RENDER_COLD_START_MS = 50_000;
export const HEALTH_POLL_INTERVAL_MS = 3_000;
