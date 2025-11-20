import { ViewType } from "@/types";

interface TabNavigationProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  onNavigateLeft: () => void;
  onNavigateRight: () => void;
  candidateCount: number;
}

export default function TabNavigation({
  activeView,
  onViewChange,
  onNavigateLeft,
  onNavigateRight,
  candidateCount,
}: TabNavigationProps) {
  const tabs: { id: ViewType; label: string }[] = [
    { id: "compare", label: "Compare View" },
    { id: "individual", label: "Individual view" },
    { id: "shortlisted", label: "Shortlisted candidates" },
  ];

  return (
    <div className="flex justify-between border-b border-gray-200 mx-5">
      <div className="flex gap-0 items-end">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onViewChange(tab.id)}
            className={`h-10 px-2 py-1 text-sm font-medium transition-colors relative cursor-pointer border border-black leading-tight ${
              activeView === tab.id
                ? "bg-green-600 text-white"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-end gap-1 px-6">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {candidateCount} Candidates
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={onNavigateLeft}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors bg-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Previous"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={onNavigateRight}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors bg-white cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Next"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
