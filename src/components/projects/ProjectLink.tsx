'use client';

import SafeExternalLink from '@/components/SafeExternalLink';
import { Project } from '@/types/project';
import { getSafeHref } from '@/services/linkSecurity';
import { FiExternalLink, FiFigma, FiFileText, FiGithub } from 'react-icons/fi';

export const ProjectLink = ({ project }: { project: Project }) => {
  const links = [
    {
      url: project.githubUrl,
      Icon: FiGithub,
      label: 'Github',
    },
    {
      url: project.figmaUrl,
      Icon: FiFigma,
      label: 'Figma',
    },
    {
      url: project.liveUrl,
      Icon: FiExternalLink,
      label: 'Application',
    },
    {
      url: project.presentationUrl,
      Icon: FiExternalLink,
      label: 'Presentation',
    },
    {
      url: project.reportUrl,
      Icon: FiFileText,
      label: 'Report',
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-start gap-2 xl:justify-end">
      {links.map(
        ({ url, Icon, label }) =>
          getSafeHref(url) && (
            <SafeExternalLink
              key={label}
              href={url!}
              className="inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-full border border-black/10 bg-white/70 px-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <Icon size={14} />
              <span>{label}</span>
            </SafeExternalLink>
          )
      )}
    </div>
  );
};
