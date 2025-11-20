import { FilterOptions } from "@/types";
import dynamic from "next/dynamic";

const FilterDropdown = dynamic(() => import("@/components/FilterDropdown"), {
  ssr: false,
});

interface FilterButtonProps {
  filters: FilterOptions;
  showFilter: boolean;
  hasActiveFilters: boolean;
  filterRef: React.RefObject<HTMLDivElement | null>;
  onToggleFilter: () => void;
  onFilterChange: (filters: FilterOptions) => void;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

export default function FilterButton({
  filters,
  showFilter,
  hasActiveFilters,
  filterRef,
  onToggleFilter,
  onFilterChange,
  onFiltersChange,
  onClearFilters,
}: FilterButtonProps) {
  return (
    <div className="p-5 pb-0 max-w-fit">
      <div className="mb-3 relative" ref={filterRef}>
        <button
          onClick={onToggleFilter}
          className={`flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors bg-white cursor-pointer ${
            hasActiveFilters ? "border-green-600 bg-green-50" : ""
          }`}
        >
          <span className="text-sm font-medium text-gray-700">Filter</span>
          {hasActiveFilters && <span className="w-2 h-2 bg-green-600 rounded-full"></span>}
          <svg
            className={`w-4 h-4 text-gray-600 transition-transform ${showFilter ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showFilter && (
          <FilterDropdown
            localFilters={filters}
            hasActiveFilters={hasActiveFilters}
            onFilterChange={onFilterChange}
            onFiltersChange={onFiltersChange}
            onClearFilters={onClearFilters}
            onClose={onToggleFilter}
          />
        )}
      </div>
    </div>
  );
}
