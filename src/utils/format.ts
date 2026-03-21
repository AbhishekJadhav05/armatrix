// "2023-10" → "Oct 2023"
export function formatJoinedDate(raw: string): string {
  const [year, month] = raw.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

// "ROS2, C++, Python" → ["ROS2", "C++", "Python"]
export function skillsFromString(raw: string): string[] {
  return raw
    .split(",")
    .map((s: string) => s.trim())
    .filter((s: string) => s.length > 0);
}
