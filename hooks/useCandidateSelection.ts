import { useState } from "react";

export function useCandidateSelection() {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  const handleToggleCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [candidateId, ...prev]
    );
  };

  return {
    selectedCandidates,
    setSelectedCandidates,
    handleToggleCandidate,
  };
}
