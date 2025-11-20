import { Candidate, Skill, FilterOptions } from "@/types";
import { useDebouncedFilters } from "@/hooks/useDebouncedFilters";
import { getDisplayedCandidates, getCandidateValue } from "@/utils/candidateUtils";
import { getProficiencyColor, getNumericCellColor } from "@/utils/proficiencyColors";
import GridHeader from "@/components/GridHeader";

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
  const isEmpty = displayedCandidates.length === 0;
  const candidatesToShow = isEmpty ? candidates : displayedCandidates;

  return (
    <div className="flex-1 overflow-auto bg-white relative" ref={scrollRef}>
      <div className="px-5">
        <div className="sticky top-0 z-51 bg-white pb-3">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="inline-block min-w-full">
              <GridHeader candidates={candidatesToShow} />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-block min-w-full overflow-visible relative">
            <div className="relative">
              <div>
                {skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="flex bg-white">
                    <div className="shrink-0 py-1 px-4 flex items-center bg-white w-(--skill-column-width) sticky left-0 z-20">
                      <span className="text-sm font-medium text-gray-900 leading-5">
                        {skill.name}
                      </span>
                    </div>
                    <div className={`flex gap-1 min-h-6 ${isEmpty ? "opacity-60" : ""}`}>
                      {candidatesToShow.map((candidate) => {
                        const value = getCandidateValue(candidate, skill);
                        const isNumeric = skill.type === "numeric";
                        const cellColor = isNumeric
                          ? skillIndex < 3
                            ? getNumericCellColor(skillIndex)
                            : "bg-white"
                          : typeof value === "number"
                            ? getProficiencyColor(value)
                            : "bg-gray-100";

                        return (
                          <div
                            key={`${candidate.id}-${skill.name}`}
                            className={`shrink-0 h-6 flex items-center justify-center w-(--candidate-column-width) ${cellColor}`}
                          >
                            {isNumeric ? (
                              <span className="text-sm font-medium text-gray-900">{value}</span>
                            ) : (
                              <div className={`w-full h-full ${cellColor}`}></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {isEmpty && (
                <div className="absolute top-0 bottom-0 right-0 left-(--skill-column-width) flex items-center justify-center bg-white/80">
                  <button className="px-6 py-3 bg-green-800 text-white rounded-md font-medium hover:bg-green-900 transition-colors shadow-lg cursor-pointer text-base">
                    Select candidate to compare
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
