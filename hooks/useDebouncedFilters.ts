import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";
import { FilterOptions } from "@/types";
import { UI_CONSTANTS } from "@/constants/ui";

export function useDebouncedFilters(
  filters?: FilterOptions,
  onFiltersChange?: (filters: FilterOptions) => void
) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(
    filters || {
      minExperience: undefined,
      maxExperience: undefined,
      minSalary: undefined,
      maxSalary: undefined,
      maxJoinDays: undefined,
      selectedSkills: [],
      sortBy: undefined,
      sortOrder: "asc",
    }
  );

  const debouncedMinExperience = useDebounce(
    localFilters.minExperience,
    UI_CONSTANTS.DEBOUNCE_DELAY_MS
  );
  const debouncedMaxExperience = useDebounce(
    localFilters.maxExperience,
    UI_CONSTANTS.DEBOUNCE_DELAY_MS
  );
  const debouncedMinSalary = useDebounce(localFilters.minSalary, UI_CONSTANTS.DEBOUNCE_DELAY_MS);
  const debouncedMaxSalary = useDebounce(localFilters.maxSalary, UI_CONSTANTS.DEBOUNCE_DELAY_MS);
  const debouncedMaxJoinDays = useDebounce(
    localFilters.maxJoinDays,
    UI_CONSTANTS.DEBOUNCE_DELAY_MS
  );

  useEffect(() => {
    // Immediately sync localFilters when filters prop changes
    if (filters !== undefined) {
      setLocalFilters(filters);

      // If filters are cleared, immediately notify parent without debounce
      if (onFiltersChange) {
        const isCleared =
          filters.minExperience === undefined &&
          filters.maxExperience === undefined &&
          filters.minSalary === undefined &&
          filters.maxSalary === undefined &&
          filters.maxJoinDays === undefined &&
          filters.sortBy === undefined &&
          (!filters.selectedSkills || filters.selectedSkills.length === 0);

        // If cleared, immediately update without debounce
        if (isCleared) {
          onFiltersChange(filters);
        }
      }
    }
  }, [filters, onFiltersChange]);

  useEffect(() => {
    if (onFiltersChange) {
      // Skip debounced update if filters are currently cleared
      const isCleared =
        localFilters.minExperience === undefined &&
        localFilters.maxExperience === undefined &&
        localFilters.minSalary === undefined &&
        localFilters.maxSalary === undefined &&
        localFilters.maxJoinDays === undefined &&
        localFilters.sortBy === undefined &&
        (!localFilters.selectedSkills || localFilters.selectedSkills.length === 0);

      // If cleared, don't send debounced update (already handled in previous effect)
      if (isCleared) {
        return;
      }

      // Otherwise, use debounced values for numeric filters
      const debouncedFilters: FilterOptions = {
        minExperience: debouncedMinExperience,
        maxExperience: debouncedMaxExperience,
        minSalary: debouncedMinSalary,
        maxSalary: debouncedMaxSalary,
        maxJoinDays: debouncedMaxJoinDays,
        selectedSkills: localFilters.selectedSkills,
        sortBy: localFilters.sortBy,
        sortOrder: localFilters.sortOrder,
      };
      onFiltersChange(debouncedFilters);
    }
  }, [
    debouncedMinExperience,
    debouncedMaxExperience,
    debouncedMinSalary,
    debouncedMaxSalary,
    debouncedMaxJoinDays,
    localFilters.selectedSkills,
    localFilters.sortBy,
    localFilters.sortOrder,
    onFiltersChange,
  ]);

  return {
    localFilters,
    setLocalFilters,
  };
}
