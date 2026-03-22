"use client";

interface ApiWakeUpProps {
  isAwake: boolean;
  isChecking: boolean;
}

export default function ApiWakeUp({
  isAwake,
  isChecking,
}: ApiWakeUpProps): JSX.Element | null {
  // If API is healthy, don't show the banner at all.
  if (isAwake && !isChecking) return null;

  return (
    <div className="w-full bg-primary py-2 px-6 flex justify-between items-center overflow-hidden z-20 relative">
      <span className="font-mono text-[10px] font-bold text-surface-dim tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis mr-4">
        {isChecking 
          ? "SYSTEM STATUS: WAITING FOR RENDER BACKEND TO WAKE UP..." 
          : "SYSTEM STATUS: SECURING CONNECTION // API NODE UNREACHABLE"}
      </span>
      <div className="flex space-x-4 shrink-0">
        <span className="font-mono text-[10px] text-surface-dim font-bold hidden sm:inline">
          LATEST BUILD: V1.2
        </span>
        <span className="font-mono text-[10px] text-surface-dim font-bold">
          WAKE_UP_SEQUENCE: {isChecking ? "IN PROGRESS..." : "FAILED"}
        </span>
      </div>
    </div>
  );
}
