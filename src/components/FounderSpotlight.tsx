"use client";

import FounderCard from "_components/FounderCard";
import type { TeamMember } from "_types/team";

interface FounderSpotlightProps {
  founders: TeamMember[];
}

export default function FounderSpotlight({
  founders,
}: FounderSpotlightProps): JSX.Element {
  return (
    <section className="py-12 relative z-20" id="founders-section">
      {/* Arm Segment Divider */}
      <div 
        className="flex items-center px-6 md:px-12 mb-12 divider-slide" 
        id="founder-divider"
      >
        <div className="joint-marker"></div>
        <div className="h-[1px] flex-grow bg-outline-variant relative mx-4">
          <span className="absolute -top-3 left-0 font-mono text-[10px] text-primary tracking-widest">
            /01 — FOUNDERS
          </span>
        </div>
        <div className="joint-marker"></div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-outline-variant border-y border-outline-variant founders-grid">
        {founders.map((f, i) => (
          <FounderCard key={f.id} member={f} index={i} />
        ))}
      </div>
    </section>
  );
}
