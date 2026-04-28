'use client';

import SafeExternalLink from '@/components/SafeExternalLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { useUI } from '@/context/UIContext';
import { ThemeToggle } from './ThemeButton';

const Navbar = () => {
  const pathname = usePathname();
  const { isNavbarVisible } = useUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { href: '/', label: 'Home', active: pathname === '/' },
    { href: '/projects', label: 'Projects', active: pathname === '/projects' },
    { href: pathname === '/' ? '#contact' : '/#contact', label: 'Contact', active: false },
    { href: 'https://canva.link/rz63ktg99mn8nop', label: 'Resume', external: true, active: false },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isNavbarVisible) {
      setIsMenuOpen(false);
    }
  }, [isNavbarVisible]);

  if (!isNavbarVisible) {
    return null;
  }

  const renderNavItem = (item: (typeof navItems)[number], className: string) => {
    if (item.external) {
      return (
        <SafeExternalLink key={item.label} href={item.href} className={className}>
          {item.label}
        </SafeExternalLink>
      );
    }

    return (
      <Link key={item.label} href={item.href} className={className}>
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6 lg:px-8 lg:pt-6">
      <div className="pointer-events-auto relative isolate mx-auto max-w-7xl rounded-[30px] border border-black/10 bg-white/82 px-3 py-3 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl dark:border-slate-700/80 dark:bg-slate-950/88 dark:shadow-black/30 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="group min-w-0 flex flex-1 items-center gap-3 overflow-hidden">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-sm font-bold text-white shadow-lg shadow-blue-500/30">
              W
            </span>
            <span className="min-w-0 overflow-hidden leading-none">
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 sm:text-[0.62rem] sm:tracking-[0.28em]">Software Engineer</span>
              <span className="font-display block truncate whitespace-nowrap text-[0.97rem] font-bold text-slate-900 dark:text-white sm:text-base">Weeranut Chayakul</span>
            </span>
          </Link>

          <div className="relative z-20 flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full bg-slate-100/80 p-1 dark:border dark:border-slate-700/70 dark:bg-slate-900/80 lg:flex">
              {navItems.map((item) => {
                const classes = `rounded-full px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.26em] ${
                  item.active
                    ? 'bg-white text-slate-950 shadow-md dark:bg-slate-100 dark:text-slate-950 dark:shadow-black/20'
                    : 'text-slate-500 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`;

                return renderNavItem(item, classes);
              })}
            </div>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <button
              type="button"
              className="pointer-events-auto relative z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-slate-900 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="pointer-events-auto relative z-20 mt-3 rounded-[26px] border border-black/10 bg-white/88 p-3 shadow-xl shadow-slate-900/10 dark:border-slate-700/80 dark:bg-slate-900/95 lg:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => {
                const classes = `rounded-2xl px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-colors ${
                  item.active
                    ? 'bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/90 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white'
                }`;

                return renderNavItem(item, classes);
              })}

              <div className="pt-1">
                <ThemeToggle compact />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;