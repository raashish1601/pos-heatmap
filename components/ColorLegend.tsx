export default function ColorLegend() {
  const colorRanges = [
    { min: 85, max: 100, color: "bg-[#15803d]", label: "85-100" },
    { min: 75, max: 84, color: "bg-[#16a34a]", label: "75-84" },
    { min: 65, max: 74, color: "bg-[#22c55e]", label: "65-74" },
    { min: 55, max: 64, color: "bg-[#4ade80]", label: "55-64" },
    { min: 45, max: 54, color: "bg-[#86efac]", label: "45-54" },
    { min: 35, max: 44, color: "bg-[#bbf7d0]", label: "35-44" },
    { min: 25, max: 34, color: "bg-[#fef08a]", label: "25-34" },
    { min: 15, max: 24, color: "bg-[#fde047]", label: "15-24" },
    { min: 5, max: 14, color: "bg-[#fef3c7]", label: "5-14" },
    { min: 0, max: 4, color: "bg-gray-100", label: "0-4" },
  ];

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-md">
      <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Skill Score:</span>
      <div className="flex items-center gap-1.5 flex-wrap">
        {colorRanges.map((range, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <div className={`w-4 h-4 ${range.color} border border-gray-300 shrink-0`}></div>
            <span className="text-[10px] text-gray-600 whitespace-nowrap">{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
