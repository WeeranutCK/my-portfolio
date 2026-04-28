'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiCheck, FiChevronDown, FiFilter, FiSearch } from 'react-icons/fi';

interface FilterOptions {
  status: string[];
  commission: string[];
  technology: string[];
}

interface ProjectFiltersProps {
  searchQuery: string;
  filters: {
    status: string;
    commission: string;
    technology: string;
  };
  filterOptions: FilterOptions;
  onSearchChange: (value: string) => void;
  onFilterChange: (filterType: string, value: string) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

const CustomSelect = ({
  value,
  onChange,
  options,
  placeholder,
  isOpen,
  onOpenChange,
}: {
  value: string;
  onChange: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updatePosition = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom + 10,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      onOpenChange(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onOpenChange]);

  return (
    <div ref={containerRef} className="relative w-full lg:w-44">
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-sm font-medium outline-none transition-all duration-200 ${
          isOpen
            ? 'border-[hsl(var(--primary)/0.32)] bg-white text-slate-950 shadow-[0_18px_45px_-30px_rgba(59,130,246,0.32)] dark:border-[hsl(var(--primary)/0.42)] dark:bg-slate-900 dark:text-white'
            : 'border-black/10 bg-white/70 text-slate-800 hover:border-black/20 dark:border-white/10 dark:bg-slate-950/55 dark:text-white dark:hover:border-white/20'
        }`}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <FiChevronDown
          className={`shrink-0 text-slate-400 transition-transform duration-200 dark:text-slate-500 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {mounted && isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[220] overflow-hidden rounded-[22px] border border-slate-200/80 bg-white/96 shadow-[0_30px_80px_-34px_rgba(15,23,42,0.34)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/96 dark:shadow-black/55"
            style={{
              top: menuStyle.top,
              left: menuStyle.left,
              width: menuStyle.width,
            }}
          >
            <div className="custom-scrollbar max-h-72 overflow-y-auto p-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={value === opt.value}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onChange(opt.value);
                    onOpenChange(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm transition-all duration-150 ${
                    value === opt.value
                      ? 'bg-[hsl(var(--primary)/0.1)] font-semibold text-[hsl(var(--primary))] dark:bg-[hsl(var(--primary)/0.16)] dark:text-blue-300'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {value === opt.value && <FiCheck className="shrink-0 text-[hsl(var(--primary))]" />}
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export const ProjectFilter = ({
  searchQuery,
  filters,
  filterOptions,
  onSearchChange,
  onFilterChange,
}: ProjectFiltersProps) => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [openSelect, setOpenSelect] = useState<string | null>(null);

  // Status: page stores 'All Status' as the reset value, so the first option must use that as its value
  const statusOptions: SelectOption[] = [
    { value: 'All Status', label: 'All Status' },
    ...filterOptions.status
      .filter((s) => s !== 'all' && s !== 'All Status')
      .map((s) => ({ value: s, label: s[0].toUpperCase() + s.slice(1) })),
  ];

  // Commission: page passes 'all' / 'true' / 'false' — these already match
  const typeOptions: SelectOption[] = [
    { value: 'all', label: 'All Types' },
    { value: 'true', label: 'Commission' },
    { value: 'false', label: 'Personal' },
  ];

  // Stack: page stores 'All Stacks' as the reset value
  const stackOptions: SelectOption[] = [
    { value: 'All Stacks', label: 'All Stacks' },
    ...filterOptions.technology
      .filter((t) => t !== 'all' && t !== 'All Stacks')
      .map((t) => ({ value: t, label: t })),
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-white/80 py-3 pl-12 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-colors focus:border-[hsl(var(--primary))] dark:border-white/10 dark:bg-slate-950/60 dark:text-white"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-200 lg:hidden"
        >
          <FiFilter />
          Filters
        </button>
        <div
          className={`flex flex-col gap-3 lg:flex-row transition-all duration-300 ${
            isFiltersVisible
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0 lg:max-h-[500px] lg:opacity-100'
          } overflow-hidden lg:overflow-visible`}
        >
          <CustomSelect
            value={filters.status}
            onChange={(v) => onFilterChange('status', v)}
            options={statusOptions}
            isOpen={openSelect === 'status'}
            onOpenChange={(open) => setOpenSelect(open ? 'status' : null)}
          />
          <CustomSelect
            value={filters.commission}
            onChange={(v) => onFilterChange('commission', v)}
            options={typeOptions}
            isOpen={openSelect === 'commission'}
            onOpenChange={(open) => setOpenSelect(open ? 'commission' : null)}
          />
          <CustomSelect
            value={filters.technology}
            onChange={(v) => onFilterChange('technology', v)}
            options={stackOptions}
            isOpen={openSelect === 'technology'}
            onOpenChange={(open) => setOpenSelect(open ? 'technology' : null)}
          />
        </div>
      </div>
    </div>
  );
};
