import { Candidate } from "@/types";

interface GridHeaderProps {
  candidates: Candidate[];
}

export default function GridHeader({ candidates }: GridHeaderProps) {
  return (
    <div className="flex items-start mb-3 overflow-visible">
      <div className="mb-3" style={{ width: "var(--skill-column-width)" }}></div>
      <div className="flex items-start gap-0 overflow-visible">
        {candidates.map((candidate, index) => (
          <div
            key={candidate.id}
            className="shrink-0 flex flex-col items-center relative overflow-visible pt-[50px] mr-1"
            style={{ width: "var(--candidate-column-width)" }}
          >
            <div
              className="absolute top-[-10px] left-[50px] right-0 h-[50px] overflow-visible flex items-center justify-center"
              style={{ zIndex: 20 + index }}
            >
              <span
                className="text-[10px] font-medium text-gray-700 whitespace-nowrap inline-block"
                style={{
                  transform: "rotate(-45deg)",
                  transformOrigin: "center center",
                }}
              >
                {candidate.name}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300 relative z-10">
              <span className="text-[9px] font-medium text-gray-700">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
