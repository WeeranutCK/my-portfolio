"use client";

import { Project } from "@/types/project";
import Link from "next/link";
import { FiExternalLink, FiFigma, FiGithub } from "react-icons/fi";

export const ProjectLink = ({ project }: { project: Project }) => {
  const links = [
    {
      url: project.githubUrl,
      Icon: FiGithub,
      label: "Github",
    },
    {
      url: project.figmaUrl,
      Icon: FiFigma,
      label: "Figma",
    },
    {
      url: project.liveUrl,
      Icon: FiExternalLink,
      label: "Application",
    },
    {
      url: project.presentationUrl,
      Icon: FiExternalLink,
      label: "Presentation",
    },
  ];

  return (
    <div className="flex flex-col gap-2 pt-1">
      {links.map(
        ({ url, Icon, label }) =>
          url && (
            <Link
              key={label}
              href={url}
              target="_blank"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </Link>
          )
      )}
    </div>
  );
};
