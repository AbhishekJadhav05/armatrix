"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { TeamMember } from "_types/team";

interface FounderCardProps {
  member: TeamMember;
  index: number;
}

export default function FounderCard({
  member,
  index,
}: FounderCardProps): JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('docked');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="bg-surface p-8 border-l-[3px] border-primary group hover:bg-surface-container transition-colors duration-300 founder-card-dock"
      style={{ transitionDelay: `${(index + 1) * 100}ms` }}
    >
      {/* Photo Container */}
      <div className="w-28 h-28 mb-6 bg-surface-container-lowest border border-outline-variant p-2 overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={member.photo_url}
            alt={member.name}
            fill
            sizes="112px"
            className="grayscale group-hover:grayscale-0 transition-all duration-300"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <span className="font-mono text-[10px] text-primary tracking-widest uppercase block">
          {member.role}
        </span>
        <h3 className="font-syne text-2xl text-white uppercase m-0">
          {member.name}
        </h3>
        <p className="font-body text-sm text-zinc-500 leading-relaxed m-0 mt-2">
          {member.bio}
        </p>
      </div>
    </div>
  );
}
