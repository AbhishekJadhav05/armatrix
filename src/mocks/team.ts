import { Department } from "_enums/department";
import type { TeamMember } from "_types/team";

function _photo(name: string): string {
  const encoded = name.replace(/ /g, "+");
  return (
    `https://ui-avatars.com/api/?name=${encoded}` +
    `&background=1A1A1A&color=E8FF47&size=400&bold=true&font-size=0.33&format=png`
  );
}

export const MOCK_MEMBERS: TeamMember[] = [
  {
    id: "a1b2c3d4-0001-0001-0001-000000000001",
    name: "Aryan Velez",
    role: "Co-Founder & CEO",
    department: Department.Leadership,
    bio: "Robotics systems architect who presented control systems for hyper-redundant arms at IAC 2023. Believes the bottleneck in industrial inspection is access, not intelligence.",
    photo_url: _photo("Aryan Velez"),
    linkedin_url: "https://linkedin.com",
    github_url: null,
    is_founder: true,
    joined_date: "2023-10",
    skills: ["Robotics Systems", "Control Theory", "Fundraising", "Strategy"],
    fun_fact: "Once assembled a 6-DOF arm from bicycle parts during a blackout.",
    created_at: "2023-10-01T00:00:00Z",
  },
  {
    id: "a1b2c3d4-0002-0002-0002-000000000002",
    name: "Priya Solano",
    role: "Co-Founder & CTO",
    department: Department.Leadership,
    bio: "Controls and embedded systems specialist who designed the external actuation system from first principles. Has a pathological distrust of off-the-shelf motor drivers.",
    photo_url: _photo("Priya Solano"),
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    is_founder: true,
    joined_date: "2023-10",
    skills: ["Embedded Systems", "Control Systems", "PCB Design", "Firmware"],
    fun_fact: "Her first embedded project was a theremin built from a 555 timer at age 14.",
    created_at: "2023-10-01T00:00:00Z",
  },
  {
    id: "a1b2c3d4-0004-0004-0004-000000000004",
    name: "Rohan Deschamps",
    role: "Senior Robotics Engineer",
    department: Department.Engineering,
    bio: "Specialises in inverse kinematics and real-time path planning for hyper-redundant chains. Responsible for the motion stack on MVP 01. Quietly makes every demo look easy.",
    photo_url: _photo("Rohan Deschamps"),
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    is_founder: false,
    joined_date: "2024-02",
    skills: ["Kinematics", "ROS2", "C++", "Path Planning"],
    fun_fact: "Can mentally simulate a 12-DOF arm's workspace. Claims it's just geometry.",
    created_at: "2024-02-01T00:00:00Z",
  },
];
