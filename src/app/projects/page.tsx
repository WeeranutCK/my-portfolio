'use client';

import { CommissionBadge } from '@/components/projects/CommissionBadge';
import { Pagination } from '@/components/projects/Pagination';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { ProjectLink } from '@/components/projects/ProjectLink';
import { StatusBadge } from '@/components/projects/StatusBadge';
import projectData from '@/data/projectData';
import { Project } from '@/types/project';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';

const ITEMS_PER_PAGE = 5;

interface StatusBadge {
  status: Project['status'];
}

interface Filters {
  status: string;
  commission: string;
  technology: string;
}

const colorSchemes = [
  'bg-blue-100 dark:bg-blue-900',
  'bg-purple-100 dark:bg-purple-900',
  'bg-green-100 dark:bg-green-900',
  'bg-yellow-100 dark:bg-yellow-900',
  'bg-red-100 dark:bg-red-900',
  'bg-indigo-100 dark:bg-indigo-900',
  'bg-pink-100 dark:bg-pink-900',
  'bg-cyan-100 dark:bg-cyan-900',
  'bg-orange-100 dark:bg-orange-900',
  'bg-teal-100 dark:bg-teal-900',
];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    commission: 'all',
    technology: 'all',
  });
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Project | '';
    direction: 'asc' | 'desc';
  }>({
    key: '',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const techColorMap = useMemo(() => {
    const uniqueTechnologies = Array.from(
      new Set(projectData.flatMap((project) => project.technologies))
    );
    return uniqueTechnologies.reduce((acc, tech, index) => {
      acc[tech] = colorSchemes[index % colorSchemes.length];
      return acc;
    }, {} as Record<string, string>);
  }, []);

  const filterOptions = useMemo(() => {
    return {
      status: [
        'all',
        ...new Set(
          projectData.map((project) =>
            project.status ? project.status : 'none'
          )
        ),
      ].sort(),
      commission: ['all', 'true', 'false'].sort(),
      technology: [
        'all',
        ...new Set(projectData.flatMap((project) => project.technologies)),
      ].sort(),
    };
  }, []);

  const sortedAndFilteredProjects = useMemo(() => {
    const filtered = projectData.filter((project) => {
      const searchMatch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const statusMatch =
        filters.status === 'all' ||
        (project.status === undefined ? 'none' : project.status) ===
          filters.status;

      const commissionMatch =
        filters.commission === 'all' ||
        (filters.commission === 'true'
          ? project.commission === true
          : project.commission === false || project.commission === undefined);

      const technologyMatch =
        filters.technology === 'all' ||
        project.technologies.includes(filters.technology);

      return searchMatch && statusMatch && commissionMatch && technologyMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Project] ?? '';
        const bValue = b[sortConfig.key as keyof Project] ?? '';

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchQuery, filters, sortConfig, projectData]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedAndFilteredProjects.slice(startIndex, endIndex);
  }, [sortedAndFilteredProjects, currentPage]);

  const totalPages = Math.ceil(
    sortedAndFilteredProjects.length / ITEMS_PER_PAGE
  );

  interface SortableColumnHeaderProps {
    label: string;
    sortKey?: keyof Project;
    currentSort: {
      key: keyof Project | '';
      direction: 'asc' | 'desc';
    };
    onSort: (key: keyof Project) => void;
    className?: string;
  }

  const SortableColumnHeader = ({
    label,
    sortKey,
    currentSort,
    onSort,
    className = '',
  }: SortableColumnHeaderProps) => {
    const isSorted = sortKey && currentSort.key === sortKey;

    return (
      <button
        onClick={() => sortKey && onSort(sortKey)}
        className={`group flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 ${className} ${
          !sortKey
            ? 'cursor-default hover:text-current dark:hover:text-current'
            : 'cursor-pointer'
        }`}
      >
        <span>{label}</span>
        {sortKey && (
          <HiChevronDown
            size={16}
            className={`transform transition-all duration-200 
            ${isSorted ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}
            ${
              isSorted && currentSort.direction === 'asc'
                ? 'rotate-180'
                : 'rotate-0'
            }
            ${
              isSorted
                ? 'text-blue-700 dark:text-blue-400'
                : 'text-gray-800 dark:text-gray-100'
            }
          `}
          />
        )}
      </button>
    );
  };

  const handleSort = (key: keyof Project) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    
    if (newPage < currentPage) {
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    } else if (newPage > currentPage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  return (
    <div className="flex flex-col justify-start items-center min-h-[100svh] w-full pb-5 md:pb-20">
      <div className="w-full h-full pt-24 md:pt-28 px-4 md:px-14 max-w-7xl">
        <div className="text-2xl md:text-3xl font-bold mb-8">Projects</div>
        <ProjectFilter
          searchQuery={searchQuery}
          filters={filters}
          filterOptions={filterOptions}
          onSearchChange={setSearchQuery}
          onFilterChange={(filterType, value) =>
            setFilters((prev) => ({ ...prev, [filterType]: value }))
          }
        />
        <div className="hidden md:block w-full">
          <div className="grid grid-cols-[2.5fr,1fr,0.4fr,0.6fr,1fr,0.75fr] gap-4 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-t-lg font-medium">
            <SortableColumnHeader
              label="Project"
              sortKey="title"
              currentSort={sortConfig}
              onSort={handleSort}
            />
            <SortableColumnHeader
              label="Date"
              sortKey="date"
              currentSort={sortConfig}
              onSort={handleSort}
            />
            <SortableColumnHeader
              label="Status"
              sortKey="status"
              currentSort={sortConfig}
              onSort={handleSort}
            />
            <SortableColumnHeader
              label="Commission"
              sortKey="commission"
              currentSort={sortConfig}
              onSort={handleSort}
            />
            <div>Tech Stack</div>
            <div>Links</div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700">
            {paginatedProjects.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No projects found matching your criteria
              </div>
            ) : (
              paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group grid grid-cols-[2.5fr,1fr,0.4fr,0.6fr,1fr,0.75fr] gap-4 px-4 py-6 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors items-start"
                >
                  <div className="space-y-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-2 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {project.title}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {project.shortDescription}
                    </p>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 pt-1">
                    {project.date}
                  </div>
                  <div className="pt-1">
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    <CommissionBadge commission={project.commission} />
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={`${project.id}-${tech}`}
                          className={`inline-flex items-center h-7 px-2 py-0.5 text-xs rounded-full font-semibold text-gray-600 dark:text-gray-300 ${techColorMap[tech]}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ProjectLink project={project} />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="md:hidden w-full">
          {paginatedProjects.length === 0 ? (
            <div className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
              No projects found matching your criteria
            </div>
          ) : (
            paginatedProjects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 shadow-sm"
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 mb-2 block"
                >
                  {project.title}
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {project.shortDescription}
                </p>
                <div className="flex flex-col gap-2 items-start mb-3 text-sm">
                  <div className="flex w-full justify-between">
                    <div className="text-gray-600 dark:text-gray-300">
                      {project.date}
                    </div>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="flex gap-2">
                    Commission:
                    <div className="-pt-1">
                      <CommissionBadge commission={project.commission} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-3 -ml-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={`${project.id}-${tech}`}
                      className={`inline-flex items-center h-7 px-2 py-0.5 text-xs rounded-full font-semibold text-gray-600 dark:text-gray-300 ${techColorMap[tech]}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-3">
                  <ProjectLink project={project} />
                </div>
              </div>
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
