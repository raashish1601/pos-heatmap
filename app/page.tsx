import CandidateComparisonClient from "@/components/CandidateComparisonClient";
import { MOCK_CANDIDATES, COMPARISON_SKILLS } from "@/constants";

export default function Home() {
  return <CandidateComparisonClient candidates={MOCK_CANDIDATES} skills={COMPARISON_SKILLS} />;
}
