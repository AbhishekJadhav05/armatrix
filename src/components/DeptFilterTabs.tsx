"use client";

import { ALL_DEPARTMENTS } from "_enums/department";
import type { DeptFilter } from "_types/team";

interface DeptFilterTabsProps {
  active: DeptFilter;
  onChange: (dept: DeptFilter) => void;
  counts: Record<DeptFilter, number>;
}

export default function DeptFilterTabs({
  active,
  onChange,
  counts,
}: DeptFilterTabsProps): JSX.Element {
  const tabs: DeptFilter[] = ["All", ...ALL_DEPARTMENTS.filter((d) => counts[d] > 0)];

  return (
    <div className="px-6 md:px-12 flex flex-nowrap md:flex-wrap gap-1 md:gap-2 mb-8 overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`
              flex-shrink-0 font-mono text-[10px] uppercase font-bold px-6 py-2 tracking-widest transition-colors
              ${isActive 
                ? "bg-primary text-surface-dim" 
                : "bg-surface-container text-zinc-500 hover:text-white"
              }
            `}
          >
            {tab}
            <span className="ml-2 opacity-60 font-normal">
              [{counts[tab]}]
            </span>
          </button>
        );
      })}
    </div>
  );
}
