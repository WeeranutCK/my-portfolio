const ALLOWED_EXTERNAL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

export const EXTERNAL_LINK_REL = 'noopener noreferrer';

export const isHttpUrl = (value: string) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const getSafeHref = (value: string | null | undefined) => {
  if (!value) {
    return undefined;
  }

  if (value.startsWith('#')) {
    return value;
  }

  if (value.startsWith('/')) {
    return value.startsWith('//') ? undefined : value;
  }

  try {
    const parsedUrl = new URL(value);
    return ALLOWED_EXTERNAL_PROTOCOLS.has(parsedUrl.protocol) ? value : undefined;
  } catch {
    return undefined;
  }
};
