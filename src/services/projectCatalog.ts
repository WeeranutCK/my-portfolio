import { Project } from '@/types/project';

export const PROJECTS_PER_PAGE = 5;

export const TECH_BADGE_CLASSES: Record<string, string> = {
  'Next.js': 'border border-slate-300/70 bg-slate-50 text-slate-900 dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-100',
  NestJS: 'border border-rose-300/60 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-200',
  React: 'border border-sky-300/60 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/20 dark:text-sky-200',
  'Tailwind CSS': 'border border-cyan-300/60 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-200',
  TypeScript: 'border border-blue-300/60 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-200',
  Java: 'border border-orange-300/60 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/20 dark:text-orange-200',
  'Spring Boot': 'border border-emerald-300/60 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-200',
  PostgreSQL: 'border border-indigo-300/60 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-200',
  Prisma: 'border border-slate-300/60 bg-slate-100 text-slate-700 dark:border-slate-600/60 dark:bg-slate-800/80 dark:text-slate-200',
  Kafka: 'border border-zinc-300/60 bg-zinc-100 text-zinc-700 dark:border-zinc-600/60 dark:bg-zinc-800/80 dark:text-zinc-200',
  RabbitMQ: 'border border-amber-300/60 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-200',
  Redis: 'border border-red-300/60 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/20 dark:text-red-200',
  Kubernetes: 'border border-blue-300/60 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-200',
  Docker: 'border border-sky-300/60 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/20 dark:text-sky-200',
  Traefik: 'border border-teal-300/60 bg-teal-50 text-teal-700 dark:border-teal-500/30 dark:bg-teal-500/20 dark:text-teal-200',
  'WireGuard VPN': 'border border-violet-300/60 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/20 dark:text-violet-200',
  Flutter: 'border border-cyan-300/60 bg-cyan-50 text-cyan-700 dark:border-cyan-500/30 dark:bg-cyan-500/20 dark:text-cyan-200',
  Dart: 'border border-blue-300/60 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-200',
  Firebase: 'border border-amber-300/60 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-200',
  Python: 'border border-yellow-300/70 bg-yellow-50 text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/20 dark:text-yellow-200',
  Jest: 'border border-pink-300/60 bg-pink-50 text-pink-700 dark:border-pink-500/30 dark:bg-pink-500/20 dark:text-pink-200',
  Playwright: 'border border-lime-300/60 bg-lime-50 text-lime-800 dark:border-lime-500/30 dark:bg-lime-500/20 dark:text-lime-200',
  JUnit: 'border border-emerald-300/60 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-200',
  Jira: 'border border-blue-300/60 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-200',
  Confluence: 'border border-indigo-300/60 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/20 dark:text-indigo-200',
  'GPT-5': 'border border-fuchsia-300/60 bg-fuchsia-50 text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/20 dark:text-fuchsia-200',
  'Claude Sonnet 4.5': 'border border-purple-300/60 bg-purple-50 text-purple-700 dark:border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-200',
  'Claude Opus 4.5': 'border border-violet-300/60 bg-violet-50 text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/20 dark:text-violet-200',
  'Gemini Pro 3.0': 'border border-amber-300/60 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-200',
};

const monthIndexMap: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export type ProjectFilterState = {
  status: string;
  type: string;
  stack: string;
};

export type SortKey = 'title' | 'date' | 'status' | 'commission';

export type SortConfig = {
  key: SortKey;
  direction: 'asc' | 'desc';
};

export const DEFAULT_PROJECT_FILTERS: ProjectFilterState = {
  status: 'All Status',
  type: 'All Types',
  stack: 'All Stacks',
};

export const DEFAULT_PROJECT_SORT: SortConfig = {
  key: 'date',
  direction: 'desc',
};

export const createProjectFilterOptions = (projects: Project[]) => {
  const statuses = Array.from(new Set(projects.map((project) => project.status))).filter(Boolean) as string[];
  const stacks = Array.from(new Set(projects.flatMap((project) => project.technologies)));

  return {
    statuses,
    types: ['Personal', 'Commission'],
    stacks,
  };
};

const parseDateToken = (dateToken: string, fallbackMonth: 'start' | 'end') => {
  const trimmedToken = dateToken.trim();
  const monthYearPattern = /^([A-Za-z]{3})\s+(\d{4})$/;
  const monthYearMatch = monthYearPattern.exec(trimmedToken);

  if (monthYearMatch) {
    const month = monthIndexMap[monthYearMatch[1].slice(0, 3).toLowerCase()];
    const year = Number(monthYearMatch[2]);

    if (month !== undefined) {
      return new Date(year, month, fallbackMonth === 'start' ? 1 : 28).getTime();
    }
  }

  const yearOnlyPattern = /^(\d{4})$/;
  const yearOnlyMatch = yearOnlyPattern.exec(trimmedToken);
  if (yearOnlyMatch) {
    const year = Number(yearOnlyMatch[1]);
    return new Date(year, fallbackMonth === 'start' ? 0 : 11, fallbackMonth === 'start' ? 1 : 31).getTime();
  }

  const nativeTime = Date.parse(trimmedToken);
  return Number.isNaN(nativeTime) ? 0 : nativeTime;
};

const getProjectDateValue = (dateLabel: string) => {
  const segments = dateLabel.split('-').map((segment) => segment.trim()).filter(Boolean);

  if (segments.length >= 2) {
    return parseDateToken(segments.at(-1) ?? dateLabel, 'end');
  }

  return parseDateToken(dateLabel, 'end');
};

const getSortableValue = (project: Project, sortKey: SortKey) => {
  if (sortKey === 'commission') {
    return project.commission ? 'Commission' : 'Personal';
  }

  if (sortKey === 'date') {
    return getProjectDateValue(project.date);
  }

  return project[sortKey] || '';
};

export const filterProjects = (projects: Project[], searchQuery: string, filters: ProjectFilterState) => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesSearch =
      normalizedQuery.length === 0 ||
      project.title.toLowerCase().includes(normalizedQuery) ||
      project.shortDescription.toLowerCase().includes(normalizedQuery);
    const matchesStatus = filters.status === DEFAULT_PROJECT_FILTERS.status || project.status === filters.status;
    const matchesType =
      filters.type === DEFAULT_PROJECT_FILTERS.type ||
      (filters.type === 'Personal' && !project.commission) ||
      (filters.type === 'Commission' && project.commission);
    const matchesStack = filters.stack === DEFAULT_PROJECT_FILTERS.stack || project.technologies.includes(filters.stack);

    return matchesSearch && matchesStatus && matchesType && matchesStack;
  });
};

export const sortProjects = (projects: Project[], sortConfig: SortConfig | null) => {
  if (!sortConfig) {
    return projects;
  }

  return [...projects].sort((projectA, projectB) => {
    const valueA = getSortableValue(projectA, sortConfig.key);
    const valueB = getSortableValue(projectB, sortConfig.key);
    const isAscending = sortConfig.direction === 'asc';

    if (valueA < valueB) {
      return isAscending ? -1 : 1;
    }

    if (valueA > valueB) {
      return isAscending ? 1 : -1;
    }

    return 0;
  });
};

export const mapFilterChange = (filterType: string, value: string): Partial<ProjectFilterState> => {
  if (filterType === 'commission') {
    if (value === 'true') {
      return { type: 'Commission' };
    }

    if (value === 'false') {
      return { type: 'Personal' };
    }

    return { type: DEFAULT_PROJECT_FILTERS.type };
  }

  if (filterType === 'technology') {
    return { stack: value === 'all' ? DEFAULT_PROJECT_FILTERS.stack : value };
  }

  if (filterType === 'status') {
    return { status: value === 'all' ? DEFAULT_PROJECT_FILTERS.status : value };
  }

  return {};
};

export const getCommissionFilterValue = (filters: ProjectFilterState) => {
  if (filters.type === 'Commission') {
    return 'true';
  }

  if (filters.type === 'Personal') {
    return 'false';
  }

  return 'all';
};
