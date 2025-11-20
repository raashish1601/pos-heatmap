import { Candidate, Skill, FilterOptions } from "@/types";
import dynamic from "next/dynamic";
import { useDebouncedFilters } from "@/hooks/useDebouncedFilters";
import { getDisplayedCandidates } from "@/utils/candidateUtils";
import GridHeader from "@/components/GridHeader";
import GridRow from "@/components/GridRow";

const ColorLegend = dynamic(() => import("@/components/ColorLegend"), {
  ssr: false,
});

interface ComparisonGridProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  skills: Skill[];
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  filters?: FilterOptions;
  onFiltersChange?: (filters: FilterOptions) => void;
}

export default function ComparisonGrid({
  candidates,
  selectedCandidates,
  skills,
  scrollRef,
  filters,
  onFiltersChange,
}: ComparisonGridProps) {
  useDebouncedFilters(filters, onFiltersChange);

  const displayedCandidates = getDisplayedCandidates(candidates, selectedCandidates);

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="p-5">
        {displayedCandidates.length === 0 ? (
          <div className="flex items-center justify-center h-[500px]">
            <p className="text-gray-500">No valid candidates selected</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-visible" ref={scrollRef}>
            <div className="inline-block min-w-full overflow-visible">
              <div className="mb-3">
                <ColorLegend />
              </div>
              <GridHeader candidates={displayedCandidates} />
              <div>
                {skills.map((skill, skillIndex) => (
                  <GridRow
                    key={skill.name}
                    skill={skill}
                    skillIndex={skillIndex}
                    candidates={displayedCandidates}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
