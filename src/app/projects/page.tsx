'use client';

import React, { useEffect, useMemo, useState } from 'react';
import projectData from '@/data/projectData';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { Pagination } from '@/components/projects/Pagination';
import { StatusBadge } from '@/components/projects/StatusBadge';
import { CommissionBadge } from '@/components/projects/CommissionBadge';
import { ProjectLink } from '@/components/projects/ProjectLink';
import { Project } from '@/types/project';
import {
  createProjectFilterOptions,
  DEFAULT_PROJECT_FILTERS,
  DEFAULT_PROJECT_SORT,
  filterProjects,
  getCommissionFilterValue,
  mapFilterChange,
  PROJECTS_PER_PAGE,
  SortConfig,
  SortKey,
  sortProjects,
  TECH_BADGE_CLASSES,
} from '@/services/projectCatalog';
import { FiChevronUp, FiChevronDown, FiLayers } from 'react-icons/fi';

const SortableColumnHeader = ({ 
  label, 
  sortKey, 
  currentSort, 
  onSort 
}: { 
  label: string; 
  sortKey: SortKey; 
  currentSort: SortConfig | null;
  onSort: (key: SortKey) => void;
}) => {
  const isActive = currentSort?.key === sortKey;
  
  return (
    <button 
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-3 transition-all hover:text-accent font-black uppercase tracking-[0.2em] ${isActive ? 'text-accent opacity-100 scale-105' : 'opacity-40 hover:opacity-100'}`}
    >
      {label}
      <div className="flex flex-col text-[10px]">
        <FiChevronUp className={isActive && currentSort?.direction === 'asc' ? 'opacity-100' : 'opacity-20'} />
        <FiChevronDown className={isActive && currentSort?.direction === 'desc' ? 'opacity-100' : 'opacity-20'} />
      </div>
    </button>
  );
};

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_PROJECT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(DEFAULT_PROJECT_SORT);

  const filterOptions = useMemo(() => createProjectFilterOptions(projectData), []);

  const filteredProjects = useMemo(() => filterProjects(projectData, searchQuery, filters), [searchQuery, filters]);

  const sortedProjects = useMemo(() => sortProjects(filteredProjects, sortConfig), [filteredProjects, sortConfig]);

  const totalPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = sortedProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev?.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const commissionFilterValue = getCommissionFilterValue(filters);

  const currentPageDisplay = `${currentPage}/${totalPages > 0 ? totalPages : 1}`;

  return (
    <section className="section-shell min-h-screen w-full px-6 pb-24 pt-4 text-slate-950 dark:text-white sm:pt-6 md:px-10 md:pt-8 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 pb-10 pt-6 sm:pt-8 md:pb-14 md:pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-6 animate-fade-in-up">
            <div className="eyebrow">
              <FiLayers className="text-xl" />
              Project Archive
            </div>
            <h1 className="text-[clamp(2.1rem,4.6vw,3.8rem)] font-bold leading-[1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Selected builds, experiments, and shipped work.
            </h1>
            <p className="max-w-3xl text-[0.98rem] leading-8 text-slate-600 dark:text-slate-300 md:text-base">
              Browse personal projects and commission work across frontend systems, backend services, and product-driven engineering.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 animate-fade-in-up sm:grid-cols-3" style={{ animationDelay: '160ms' }}>
            <div className="metric-chip min-w-[132px]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Projects</p>
              <p className="mt-2 text-2xl font-semibold">{projectData.length}</p>
            </div>
            <div className="metric-chip min-w-[132px]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Filtered</p>
              <p className="mt-2 text-2xl font-semibold">{sortedProjects.length}</p>
            </div>
            <div className="metric-chip min-w-[132px]">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Page</p>
              <p className="mt-2 text-2xl font-semibold">{currentPageDisplay}</p>
            </div>
          </div>
        </div>

        <div className="surface animate-fade-in-up p-6 md:p-8" style={{ animationDelay: '200ms' }}>
          <ProjectFilter
            searchQuery={searchQuery}
            filters={{
              status: filters.status,
              commission: commissionFilterValue,
              technology: filters.stack
            }}
            filterOptions={{
              status: ['all', ...filterOptions.statuses],
              commission: ['all', 'true', 'false'],
              technology: ['all', ...filterOptions.stacks]
            }}
            onSearchChange={setSearchQuery}
            onFilterChange={(type: string, val: string) => {
              setFilters((prev) => ({ ...prev, ...mapFilterChange(type, val) }));
            }}
          />
        </div>

        <div className="mt-8 hidden animate-fade-in-up lg:block" style={{ animationDelay: '300ms' }}>
          <div className="surface overflow-hidden">
            <div className="grid grid-cols-[2.2fr,0.9fr,0.95fr,1fr,1.8fr,1.15fr] gap-8 border-b border-black/5 px-8 py-6 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:border-white/10 dark:text-slate-400">
              <SortableColumnHeader label="Project" sortKey="title" currentSort={sortConfig} onSort={handleSort} />
              <SortableColumnHeader label="Date" sortKey="date" currentSort={sortConfig} onSort={handleSort} />
              <SortableColumnHeader label="Status" sortKey="status" currentSort={sortConfig} onSort={handleSort} />
              <SortableColumnHeader label="Type" sortKey="commission" currentSort={sortConfig} onSort={handleSort} />
              <div>Technology</div>
              <div className="text-right">Links</div>
            </div>

            <div className="divide-y divide-black/5 dark:divide-white/10">
            {paginatedProjects.map((project: Project) => (
              <div key={project.id} className="grid grid-cols-[2.2fr,0.9fr,0.95fr,1fr,1.8fr,1.15fr] gap-8 px-8 py-8 transition-colors duration-300 hover:bg-slate-50/70 dark:hover:bg-white/[0.03]">
                <div className="space-y-6">
                  <h2 className="text-[1.45rem] font-semibold leading-tight">{project.title}</h2>
                  <p className="max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300">{project.shortDescription}</p>
                </div>
                <div className="flex min-h-8 items-center text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">{project.date}</div>
                <div className="flex min-h-8 items-center"><StatusBadge status={project.status} /></div>
                <div className="flex min-h-8 items-center"><CommissionBadge commission={project.commission} /></div>
                <div className="flex flex-wrap content-start items-start gap-2 self-start">
                  {project.technologies.map((tech: string) => (
                    <span key={tech} className={`inline-flex h-8 items-center whitespace-nowrap rounded-full px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${TECH_BADGE_CLASSES[tech] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex min-h-8 items-start justify-end self-start pt-0.5"><ProjectLink project={project} /></div>
              </div>
            ))}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6 animate-fade-in-up lg:hidden" style={{ animationDelay: '300ms' }}>
          {paginatedProjects.map((project: Project) => (
            <div key={project.id} className="modern-card space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  <span>{project.date}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  <StatusBadge status={project.status} />
                </div>
                <h2 className="text-[1.9rem] font-semibold leading-tight">{project.title}</h2>
              </div>
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className={`inline-flex h-8 items-center whitespace-nowrap rounded-full px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${TECH_BADGE_CLASSES[tech] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'}`}>
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-black/5 pt-5 dark:border-white/10">
                <CommissionBadge commission={project.commission} />
                <ProjectLink project={project} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-black/5 pt-10 dark:border-white/10">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
