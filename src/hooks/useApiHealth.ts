"use client";

import { useState, useEffect } from "react";
import { api } from "_lib/api";
import { HEALTH_POLL_INTERVAL_MS, RENDER_COLD_START_MS } from "_constants/ui";

export interface UseApiHealthResult {
  isAwake: boolean;
  isChecking: boolean;
}

export function useApiHealth(): UseApiHealthResult {
  const [isAwake, setIsAwake] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = Math.ceil(
      RENDER_COLD_START_MS / HEALTH_POLL_INTERVAL_MS
    );

    const poll = async (): Promise<void> => {
      try {
        await api.health();
        setIsAwake(true);
        setIsChecking(false);
      } catch {
        attempts += 1;
        if (attempts >= maxAttempts) setIsChecking(false);
      }
    };

    void poll();
    const interval = setInterval(() => {
      void poll();
    }, HEALTH_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return { isAwake, isChecking };
}
