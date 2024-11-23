"use client";

import { FiSearch } from "react-icons/fi";

interface FilterOptions {
  status: string[];
  commission: string[];
  technology: string[];
}

interface ProjectFiltersProps {
  searchQuery: string;
  filters: {
    status: string;
    commission: string;
    technology: string;
  };
  filterOptions: FilterOptions;
  onSearchChange: (value: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

export const ProjectFilter = ({
  searchQuery,
  filters,
  filterOptions,
  onSearchChange,
  onFilterChange,
}: ProjectFiltersProps) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
 
      <select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="all">All Status</option>
        {filterOptions.status
          .filter((status) => status !== 'all')
          .map((status) => (
            <option key={`status-${status}`} value={status}>
              {status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
      </select>

      <select
        value={filters.commission}
        onChange={(e) => onFilterChange('commission', e.target.value)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="all">All Types</option>
        <option value="true">Commission</option>
        <option value="false">Personal</option>
      </select>

      <select
        value={filters.technology}
        onChange={(e) => onFilterChange('technology', e.target.value)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="all">All Stacks</option>
        {filterOptions.technology
          .filter((tech) => tech !== 'all')
          .map((tech) => (
            <option key={`tech-${tech}`} value={tech}>
              {tech}
            </option>
          ))}
      </select>
    </div>
  );
};
