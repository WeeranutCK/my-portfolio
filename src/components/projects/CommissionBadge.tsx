"use client";

import { Project } from "@/types/project";

interface CommissionBadgeProps {
  commission: Project["commission"];
}

export const CommissionBadge = ({ commission }: CommissionBadgeProps) => {
  const getBadgeClasses = (isCommission: boolean | undefined) => {
    return isCommission
      ? "bg-purple-100 dark:bg-purple-900"
      : "bg-blue-100 dark:bg-blue-900";
  };

  return (
    <div
      className={`h-6 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeClasses(
        commission
      )}`}
    >
      {commission ? "Commission" : "Personal"}
    </div>
  );
};
