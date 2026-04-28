'use client';

import { Project } from '@/types/project';

interface StatusBadgeProps {
  status: Project['status'];
}

const statusConfig = {
  online: {
    color: 'bg-emerald-500',
    text: 'Online',
  },
  offline: {
    color: 'bg-amber-500',
    text: 'Offline',
  },
  down: {
    color: 'bg-red-500',
    text: 'Down',
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (!status) {
    return (
      <span className="inline-flex h-8 whitespace-nowrap items-center gap-2 rounded-full border border-black/10 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-white/10 dark:text-slate-400">
        <span className="h-2 w-2 rounded-full bg-slate-400" />
        <span>None</span>
      </span>
    );
  }

  return (
    <span className="inline-flex h-8 whitespace-nowrap items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
      <span className={`h-2 w-2 rounded-full ${statusConfig[status].color}`} />
      <span>
        {statusConfig[status].text}
      </span>
    </span>
  );
};
