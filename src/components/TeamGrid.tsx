"use client";

import { useState, useMemo } from "react";
import DeptFilterTabs from "_components/DeptFilterTabs";
import MemberCard from "_components/MemberCard";
import { ALL_DEPARTMENTS } from "_enums/department";
import type { TeamMember, DeptFilter } from "_types/team";

interface TeamGridProps {
  members: TeamMember[];
  onExpand: (member: TeamMember) => void;
}

export default function TeamGrid({
  members,
  onExpand,
}: TeamGridProps): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<DeptFilter>("All");

  const counts = useMemo(() => {
    const c: Record<DeptFilter, number> = { All: members.length } as Record<
      DeptFilter,
      number
    >;
    for (const dept of ALL_DEPARTMENTS) {
      c[dept] = members.filter((m) => m.department === dept).length;
    }
    return c;
  }, [members]);

  const displayMembers = useMemo(
    () =>
      activeFilter === "All"
        ? members
        : members.filter((m) => m.department === activeFilter),
    [members, activeFilter]
  );

  return (
    <section className="py-12 relative z-20">
      {/* Arm Segment Divider */}
      <div className="flex items-center px-12 mb-12">
        <div className="joint-marker"></div>
        <div className="h-[1px] flex-grow bg-outline-variant relative mx-4">
          <span className="absolute -top-3 left-0 font-mono text-[10px] text-primary tracking-widest">
            /02 — THE TEAM
          </span>
        </div>
        <div className="joint-marker"></div>
      </div>

      <DeptFilterTabs
        active={activeFilter}
        onChange={setActiveFilter}
        counts={counts}
      />

      <div className="px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-outline-variant">
        {displayMembers.map((m) => (
          <MemberCard
            key={m.id}
            member={m}
            onExpand={onExpand}
          />
        ))}

        {/* Hiring Card */}
        <div className="bg-surface-container p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-primary transition-all duration-300">
          <span className="font-syne text-4xl mb-2 text-primary group-hover:text-surface-dim leading-none">+</span>
          <h4 className="font-syne text-lg text-white group-hover:text-surface-dim uppercase m-0">
            JOIN US
          </h4>
          <span className="font-mono text-[9px] text-primary group-hover:text-surface-dim tracking-tighter mt-1">
            OPEN POSITIONS
          </span>
        </div>
      </div>
    </section>
  );
}
