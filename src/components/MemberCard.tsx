"use client";

import Image from "next/image";
import type { TeamMember } from "_types/team";

interface MemberCardProps {
  member: TeamMember;
  onExpand: (member: TeamMember) => void;
}

export default function MemberCard({
  member,
  onExpand,
}: MemberCardProps): JSX.Element {
  return (
    <div
      className="bg-surface p-6 flex flex-col items-center text-center group cursor-pointer"
      onClick={() => onExpand(member)}
    >
      <div className="w-20 h-20 mb-4 bg-surface-container-lowest border border-outline-variant p-1">
        <div className="relative w-full h-full">
          <Image
            src={member.photo_url}
            alt={member.name}
            fill
            sizes="80px"
            className="md:grayscale group-hover:grayscale-0 transition-all duration-300"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <h4 className="font-syne text-lg text-white uppercase m-0 transition-colors duration-200 group-hover:text-primary">
        {member.name}
      </h4>
      <span className="font-mono text-[9px] text-zinc-500 tracking-tighter uppercase mt-1">
        {member.role}
      </span>
    </div>
  );
}
