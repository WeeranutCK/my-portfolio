'use client';

import { Project } from '@/types/project';

interface StatusBadgeProps {
  status: Project['status'];
}

const statusConfig = {
  online: {
    color: 'bg-green-500',
    text: 'Online',
  },
  offline: {
    color: 'bg-yellow-500',
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
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-500" />
        <div className="text-sm text-gray-600 dark:text-gray-300">None</div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusConfig[status].color}`} />
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {statusConfig[status].text}
      </div>
    </div>
  );
};
