"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "_lib/api";
import type {
  TeamMember,
  TeamMemberCreate,
  TeamMemberUpdate,
} from "_types/team";

export interface UseTeamMembersResult {
  members: TeamMember[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addMember: (data: TeamMemberCreate) => Promise<void>;
  editMember: (id: string, data: TeamMemberUpdate) => Promise<void>;
  removeMember: (id: string) => Promise<void>;
}

export function useTeamMembers(): UseTeamMembersResult {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTeam();
      setMembers(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load team");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const addMember = useCallback(
    async (data: TeamMemberCreate): Promise<void> => {
      const created = await api.createMember(data);
      setMembers((prev) => [...prev, created]);
    },
    []
  );

  const editMember = useCallback(
    async (id: string, data: TeamMemberUpdate): Promise<void> => {
      const updated = await api.updateMember(id, data);
      setMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
    },
    []
  );

  const removeMember = useCallback(
    async (id: string): Promise<void> => {
      const snapshot = [...members];
      setMembers((prev) => prev.filter((m) => m.id !== id));
      try {
        await api.deleteMember(id);
      } catch (err: unknown) {
        setMembers(snapshot);
        throw err;
      }
    },
    [members]
  );

  return {
    members,
    loading,
    error,
    refetch,
    addMember,
    editMember,
    removeMember,
  };
}
