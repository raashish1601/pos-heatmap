import { Candidate, Skill } from "@/types";
import { getProficiencyColor, getNumericCellColor } from "@/utils/proficiencyColors";
import { getCandidateValue } from "@/utils/candidateUtils";
import GridCell from "./GridCell";

interface GridRowProps {
  skill: Skill;
  skillIndex: number;
  candidates: Candidate[];
}

export default function GridRow({ skill, skillIndex, candidates }: GridRowProps) {
  return (
    <div className="flex bg-white">
      <div className="shrink-0 py-1 px-4 flex items-center bg-white w-[var(--skill-column-width)]">
        <span className="text-sm font-medium text-gray-900 leading-5">{skill.name}</span>
      </div>

      <div className="flex gap-1 min-h-6">
        {candidates.map((candidate) => {
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
            <GridCell
              key={`${candidate.id}-${skill.name}`}
              value={value}
              isNumeric={isNumeric}
              cellColor={cellColor}
            />
          );
        })}
      </div>
    </div>
  );
}
