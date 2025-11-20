import { Candidate } from "@/types";
import { UI_CONSTANTS } from "@/constants/ui";

interface CandidateSidebarProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onToggleCandidate: (candidateId: string) => void;
}

const CandidateItem = ({
  candidate,
  isSelected,
  onToggle,
}: {
  candidate: Candidate;
  isSelected: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className={`flex items-center justify-between py-2 px-3 border-b border-gray-200 transition-all cursor-pointer ${
      isSelected ? "bg-purple-50" : "hover:bg-gray-50"
    }`}
  >
    <div className="flex items-center gap-3 flex-1 min-w-0">
      <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center shrink-0">
        <span className="text-xs font-medium text-purple-700">
          {candidate.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)}
        </span>
      </div>
      <span className="text-sm font-medium text-gray-900 truncate">{candidate.name}</span>
    </div>
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
        isSelected ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-600"
      }`}
    >
      {isSelected ? (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
      )}
    </div>
  </div>
);

export default function CandidateSidebar({
  candidates,
  selectedCandidates,
  onToggleCandidate,
}: CandidateSidebarProps) {
  const mostRecommended = candidates.slice(0, UI_CONSTANTS.MOST_RECOMMENDED_COUNT);
  const allCandidates = candidates.slice(UI_CONSTANTS.MOST_RECOMMENDED_COUNT);

  return (
    <div className="bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col w-[var(--sidebar-width)]">
      <div className="p-5 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Most recommended</h2>
          <div className="space-y-1">
            {mostRecommended.map((candidate) => {
              const isSelected = selectedCandidates.includes(candidate.id);

              return (
                <CandidateItem
                  key={candidate.id}
                  candidate={candidate}
                  isSelected={isSelected}
                  onToggle={() => onToggleCandidate(candidate.id)}
                />
              );
            })}
          </div>
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-xs text-gray-600 leading-relaxed">
              Recommendations are based on your skill requirements and candidate&apos;s performance.
            </p>
          </div>
        </div>

        {allCandidates.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">All candidates</h2>
            <div className="space-y-1">
              {allCandidates.map((candidate) => {
                const isSelected = selectedCandidates.includes(candidate.id);

                return (
                  <CandidateItem
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={isSelected}
                    onToggle={() => onToggleCandidate(candidate.id)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
