"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "_components/Navbar";
import PageHeader from "_components/PageHeader";
import FounderSpotlight from "_components/FounderSpotlight";
import TeamGrid from "_components/TeamGrid";
import MemberModal from "_components/MemberModal";
import AdminPanel from "_components/AdminPanel";
import ApiWakeUp from "_components/ApiWakeUp";
import LoadingGrid from "_components/LoadingGrid";
import ErrorState from "_components/ErrorState";
import SnakeScrollbar from "_components/SnakeScrollbar";
import { useTeamMembers } from "_hooks/useTeamMembers";
import { useApiHealth } from "_hooks/useApiHealth";
import type { TeamMember } from "_types/team";

export default function TeamPage(): JSX.Element {
  const {
    members,
    loading,
    error,
    refetch,
    addMember,
    editMember,
    removeMember,
  } = useTeamMembers();

  const { isAwake, isChecking } = useApiHealth();

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  const founders = members.filter((m) => m.is_founder);
  const nonFounders = members.filter((m) => !m.is_founder);

  return (
    <main className="bg-surface-dim min-h-screen relative">
      <SnakeScrollbar isHidden={adminOpen} />
      <ApiWakeUp isAwake={isAwake} isChecking={isChecking} />
      <Navbar onAdminToggle={() => setAdminOpen((v) => !v)} />

      <div className="w-full max-w-[1280px] mx-auto relative overflow-hidden pt-[56px]">
        <PageHeader />

        {loading && <LoadingGrid />}
        {!loading && error && <ErrorState message={error} onRetry={refetch} />}

        {!loading && !error && (
          <>
            <FounderSpotlight founders={founders} />
            <TeamGrid members={nonFounders} onExpand={setSelectedMember} />
          </>
        )}
      </div>

      <footer className="w-full py-16 mt-12 border-t border-outline-variant flex flex-col items-center justify-center space-y-6 px-6 md:px-12 bg-surface-dim relative z-20">
        <div className="text-[10px] text-center font-mono tracking-widest text-zinc-500 uppercase px-4">
          © {new Date().getFullYear()} ARMATRIX TECHNOLOGIES PVT. LTD. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adminOpen && (
          <AdminPanel
            isOpen={adminOpen}
            members={members}
            onClose={() => setAdminOpen(false)}
            onAdd={addMember}
            onEdit={editMember}
            onDelete={removeMember}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
