export function getProficiencyColor(score: number): string {
  if (score >= 85) return "bg-[#15803d]";
  if (score >= 75) return "bg-[#16a34a]";
  if (score >= 65) return "bg-[#22c55e]";
  if (score >= 55) return "bg-[#4ade80]";
  if (score >= 45) return "bg-[#86efac]";
  if (score >= 35) return "bg-[#bbf7d0]";
  if (score >= 25) return "bg-[#fef08a]";
  if (score >= 15) return "bg-[#fde047]";
  if (score >= 5) return "bg-[#fef3c7]";
  return "bg-gray-100";
}

export function getNumericCellColor(index: number): string {
  if (index === 0) return "bg-[#f0fdf4]";
  if (index === 1 || index === 2) return "bg-[#fffbeb]";
  return "bg-white";
}
