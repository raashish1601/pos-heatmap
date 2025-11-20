import { useState, useEffect, useRef } from "react";
import { FilterOptions } from "@/types";

export function useFilters(initialFilters?: FilterOptions) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {});
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const hasActiveFilters =
    filters.minExperience !== undefined ||
    filters.maxExperience !== undefined ||
    filters.minSalary !== undefined ||
    filters.maxSalary !== undefined ||
    filters.maxJoinDays !== undefined ||
    (filters.selectedSkills && filters.selectedSkills.length > 0) ||
    filters.sortBy !== undefined;

  useEffect(() => {
    if (!showFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      minExperience: undefined,
      maxExperience: undefined,
      minSalary: undefined,
      maxSalary: undefined,
      maxJoinDays: undefined,
      selectedSkills: [],
      sortBy: undefined,
      sortOrder: "asc",
    };
    setFilters(clearedFilters);
  };

  return {
    filters,
    setFilters,
    showFilter,
    setShowFilter,
    filterRef,
    hasActiveFilters,
    handleFilterChange,
    clearFilters,
  };
}
