import { AnchorHTMLAttributes, ReactNode } from 'react';
import { EXTERNAL_LINK_REL, getSafeHref } from '@/services/linkSecurity';

type SafeExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  openInNewTab?: boolean;
};

const SafeExternalLink = ({
  href,
  children,
  openInNewTab = true,
  rel,
  ...anchorProps
}: SafeExternalLinkProps) => {
  const safeHref = getSafeHref(href);

  if (!safeHref) {
    return null;
  }

  return (
    <a
      {...anchorProps}
      href={safeHref}
      target={openInNewTab ? '_blank' : anchorProps.target}
      rel={openInNewTab ? EXTERNAL_LINK_REL : rel}
    >
      {children}
    </a>
  );
};

export default SafeExternalLink;
