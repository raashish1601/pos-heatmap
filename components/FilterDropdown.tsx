import { FilterOptions } from "@/types";

interface FilterDropdownProps {
  localFilters: FilterOptions;
  hasActiveFilters: boolean;
  onFilterChange: (filters: FilterOptions) => void;
  onFiltersChange?: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  onClose?: () => void;
}

export default function FilterDropdown({
  localFilters,
  hasActiveFilters,
  onFilterChange,
  onFiltersChange,
  onClearFilters,
  onClose,
}: FilterDropdownProps) {
  return (
    <div
      className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-52 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClearFilters();
                // Also call onFiltersChange to ensure parent state is updated
                if (onFiltersChange) {
                  const clearedFilters = {
                    minExperience: undefined,
                    maxExperience: undefined,
                    minSalary: undefined,
                    maxSalary: undefined,
                    maxJoinDays: undefined,
                    selectedSkills: [],
                    sortBy: undefined,
                    sortOrder: "asc" as const,
                  };
                  onFiltersChange(clearedFilters);
                }
              }}
              className="text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Clear all
            </button>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Experience (years)</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minExperience || ""}
              onChange={(e) =>
                onFilterChange({
                  ...localFilters,
                  minExperience: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxExperience || ""}
              onChange={(e) =>
                onFilterChange({
                  ...localFilters,
                  maxExperience: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Salary Expected (LPA)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minSalary || ""}
              onChange={(e) =>
                onFilterChange({
                  ...localFilters,
                  minSalary: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxSalary || ""}
              onChange={(e) =>
                onFilterChange({
                  ...localFilters,
                  maxSalary: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Can join within (days)
          </label>
          <input
            type="number"
            placeholder="Maximum days"
            value={localFilters.maxJoinDays || ""}
            onChange={(e) =>
              onFilterChange({
                ...localFilters,
                maxJoinDays: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">Sort by</label>
          <div className="space-y-2">
            <select
              value={localFilters.sortBy || ""}
              onChange={(e) => {
                const updatedFilters = {
                  ...localFilters,
                  sortBy: (e.target.value as FilterOptions["sortBy"]) || undefined,
                };
                onFilterChange(updatedFilters);
                if (onFiltersChange) {
                  onFiltersChange(updatedFilters);
                }
              }}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
            >
              <option value="">None</option>
              <option value="experience">Experience</option>
              <option value="salary">Salary</option>
              <option value="availability">Availability</option>
              <option value="name">Name</option>
            </select>
            {localFilters.sortBy && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const updatedFilters: FilterOptions = {
                      ...localFilters,
                      sortOrder: "asc" as const,
                    };
                    onFilterChange(updatedFilters);
                    if (onFiltersChange) {
                      onFiltersChange(updatedFilters);
                    }
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-md cursor-pointer ${
                    localFilters.sortOrder === "asc"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Ascending
                </button>
                <button
                  onClick={() => {
                    const updatedFilters: FilterOptions = {
                      ...localFilters,
                      sortOrder: "desc" as const,
                    };
                    onFilterChange(updatedFilters);
                    if (onFiltersChange) {
                      onFiltersChange(updatedFilters);
                    }
                  }}
                  className={`flex-1 px-3 py-1.5 text-xs rounded-md cursor-pointer ${
                    localFilters.sortOrder === "desc"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Descending
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
