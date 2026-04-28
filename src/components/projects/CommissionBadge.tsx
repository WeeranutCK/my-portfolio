'use client';

import { Project } from '@/types/project';

interface CommissionBadgeProps {
  commission: Project['commission'];
}

export const CommissionBadge = ({ commission }: CommissionBadgeProps) => {
  const getBadgeClasses = (isCommission: boolean | undefined) => {
    return isCommission
      ? 'bg-[hsl(var(--accent)/0.14)] text-[hsl(var(--accent))]'
      : 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]';
  };

  return (
    <div
      className={`inline-flex h-8 whitespace-nowrap items-center rounded-full border border-black/5 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] dark:border-white/10 ${getBadgeClasses(
        commission
      )}`}
    >
      {commission ? 'Commission' : 'Personal'}
    </div>
  );
};
