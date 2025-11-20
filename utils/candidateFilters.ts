import { Candidate, FilterOptions } from "@/types";

export function applyCandidateFilters(
  candidates: Candidate[],
  filterOptions: FilterOptions
): Candidate[] {
  let filtered = [...candidates];

  if (filterOptions.minExperience !== undefined) {
    filtered = filtered.filter((c) => c.experience >= filterOptions.minExperience!);
  }
  if (filterOptions.maxExperience !== undefined) {
    filtered = filtered.filter((c) => c.experience <= filterOptions.maxExperience!);
  }

  if (filterOptions.minSalary !== undefined) {
    filtered = filtered.filter((c) => c.minimumSalary >= filterOptions.minSalary!);
  }
  if (filterOptions.maxSalary !== undefined) {
    filtered = filtered.filter((c) => c.minimumSalary <= filterOptions.maxSalary!);
  }

  if (filterOptions.maxJoinDays !== undefined) {
    filtered = filtered.filter((c) => c.canJoinIn <= filterOptions.maxJoinDays!);
  }

  if (filterOptions.sortBy) {
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (filterOptions.sortBy) {
        case "experience":
          aValue = a.experience;
          bValue = b.experience;
          break;
        case "salary":
          aValue = a.minimumSalary;
          bValue = b.minimumSalary;
          break;
        case "availability":
          aValue = a.canJoinIn;
          bValue = b.canJoinIn;
          break;
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return filterOptions.sortOrder === "desc"
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      return filterOptions.sortOrder === "desc"
        ? (bValue as number) - (aValue as number)
        : (aValue as number) - (bValue as number);
    });
  }

  return filtered;
}
