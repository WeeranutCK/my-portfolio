export type Theme = 'light' | 'dark';

export const THEME_COOKIE_NAME = 'theme';
export const THEME_STORAGE_KEY = 'theme';

export const THEME_INIT_SCRIPT = `
try {
  const themeKey = '${THEME_STORAGE_KEY}';
  const documentElement = document.documentElement;
  const cookieMatch = /(?:^|; )${THEME_COOKIE_NAME}=([^;]+)/.exec(document.cookie);
  const cookieTheme = cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
  const storedTheme = localStorage.getItem(themeKey);

  let explicitTheme = null;
  if (cookieTheme === 'light' || cookieTheme === 'dark') {
    explicitTheme = cookieTheme;
  } else if (storedTheme === 'light' || storedTheme === 'dark') {
    explicitTheme = storedTheme;
  }

  const resolvedTheme = explicitTheme || (globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  documentElement.classList.toggle('dark', resolvedTheme === 'dark');
  documentElement.dataset.theme = resolvedTheme;
  documentElement.style.colorScheme = resolvedTheme;
} catch {}
`;

export const isTheme = (value: string | null | undefined): value is Theme => {
  return value === 'light' || value === 'dark';
};

export const resolveThemePreference = ({
  cookieTheme,
  storedTheme,
  prefersDark,
}: {
  cookieTheme?: string | null;
  storedTheme?: string | null;
  prefersDark: boolean;
}): Theme => {
  if (isTheme(cookieTheme)) {
    return cookieTheme;
  }

  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  return prefersDark ? 'dark' : 'light';
};

export const buildThemeCookie = (theme: Theme, isSecure: boolean) => {
  const cookieParts = [
    `${THEME_COOKIE_NAME}=${theme}`,
    'Path=/',
    'Max-Age=31536000',
    'SameSite=Lax',
  ];

  if (isSecure) {
    cookieParts.push('Secure');
  }

  return cookieParts.join('; ');
};
