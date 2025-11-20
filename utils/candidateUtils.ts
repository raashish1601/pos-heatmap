import { Candidate, Skill } from "@/types";

export function getCandidateValue(candidate: Candidate, skill: Skill): number | string {
  if (skill.type === "numeric") {
    if (skill.name === "Experience") return candidate.experience;
    if (skill.name === "Can join in") return candidate.canJoinIn;
    if (skill.name === "Minimum salary expected") return candidate.minimumSalary;
  }
  return candidate.skills[skill.name] || 0;
}

export function getDisplayedCandidates(
  candidates: Candidate[],
  selectedCandidates: string[]
): Candidate[] {
  return selectedCandidates
    .map((id) => candidates.find((c) => c.id === id))
    .filter((c): c is Candidate => c !== undefined);
}
