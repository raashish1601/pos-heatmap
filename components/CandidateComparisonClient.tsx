"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import TabNavigation from "@/components/TabNavigation";
import CandidateSidebar from "@/components/CandidateSidebar";
import FilterButton from "@/components/FilterButton";
import EmptyState from "@/components/EmptyState";
import { ViewType, Candidate, Skill } from "@/types";
import { UI_CONSTANTS } from "@/constants/ui";
import { applyCandidateFilters } from "@/utils/candidateFilters";
import { useFilters } from "@/hooks/useFilters";
import { useCandidateSelection } from "@/hooks/useCandidateSelection";
import { useGridNavigation } from "@/hooks/useGridNavigation";

const ComparisonGrid = dynamic(() => import("@/components/ComparisonGrid"), {
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-gray-500">Loading comparison grid...</div>
    </div>
  ),
  ssr: false,
});

interface CandidateComparisonClientProps {
  candidates: Candidate[];
  skills: Skill[];
}

export default function CandidateComparisonClient({
  candidates,
  skills,
}: CandidateComparisonClientProps) {
  const [activeView, setActiveView] = useState<ViewType>("compare");

  const {
    filters,
    setFilters,
    showFilter,
    setShowFilter,
    filterRef,
    hasActiveFilters,
    handleFilterChange,
    clearFilters,
  } = useFilters();

  const { selectedCandidates, handleToggleCandidate } = useCandidateSelection();
  const { gridScrollRef, handleNavigateLeft, handleNavigateRight } = useGridNavigation();

  const filteredCandidates = applyCandidateFilters(candidates, filters);

  const handleBack = () => {};

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header jobTitle={UI_CONSTANTS.JOB_TITLE} onBack={handleBack} />
      <div className="flex-1 flex overflow-hidden min-h-0">
        <CandidateSidebar
          candidates={filteredCandidates}
          selectedCandidates={selectedCandidates}
          onToggleCandidate={handleToggleCandidate}
        />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-white">
          <TabNavigation
            activeView={activeView}
            onViewChange={setActiveView}
            onNavigateLeft={handleNavigateLeft}
            onNavigateRight={handleNavigateRight}
            candidateCount={filteredCandidates.length}
          />
          {activeView === "compare" && (
            <>
              <FilterButton
                filters={filters}
                showFilter={showFilter}
                hasActiveFilters={hasActiveFilters}
                filterRef={filterRef}
                onToggleFilter={() => setShowFilter(!showFilter)}
                onFilterChange={handleFilterChange}
                onFiltersChange={setFilters}
                onClearFilters={() => {
                  const clearedFilters = {
                    minExperience: undefined,
                    maxExperience: undefined,
                    minSalary: undefined,
                    maxSalary: undefined,
                    maxJoinDays: undefined,
                    selectedSkills: [],
                    sortBy: undefined,
                    sortOrder: "asc" as const,
                  };
                  setFilters(clearedFilters);
                }}
              />
              {selectedCandidates.length === 0 ? (
                <EmptyState message="Select candidates to compare" />
              ) : (
                <ComparisonGrid
                  candidates={candidates}
                  selectedCandidates={selectedCandidates}
                  skills={skills}
                  scrollRef={gridScrollRef}
                  filters={filters}
                  onFiltersChange={setFilters}
                />
              )}
            </>
          )}
          {activeView === "individual" && (
            <div className="flex-1 flex items-center justify-center bg-white">
              <p className="text-gray-500">Individual view - Coming soon</p>
            </div>
          )}
          {activeView === "shortlisted" && (
            <div className="flex-1 flex items-center justify-center bg-white">
              <p className="text-gray-500">Shortlisted candidates - Coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
