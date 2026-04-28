import Link from 'next/link';
import { FiArrowLeft, FiCompass } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <section className="section-shell relative flex min-h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden px-6 pb-24 pt-4 sm:pt-6 md:pt-8 md:px-10 lg:px-14">
      <div className="pointer-events-none absolute left-[-10%] top-[8%] h-64 w-64 rounded-full bg-[hsl(var(--primary)/0.14)] blur-3xl accent-orb" />
      <div className="pointer-events-none absolute bottom-[8%] right-[-6%] h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.14)] blur-3xl accent-orb" />

      <div className="surface relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-8 overflow-hidden px-7 py-10 text-center md:px-10 md:py-12">
        <div className="eyebrow">
          <FiCompass className="text-base" />
          Page Not Found
        </div>

        <div className="space-y-4">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
            Error 404
          </p>
          <h1 className="text-[clamp(2.1rem,4.6vw,3.8rem)] font-bold leading-[0.96] text-slate-950 dark:text-white">
            This route doesn&apos;t exist in the portfolio.
          </h1>
          <p className="mx-auto max-w-2xl text-[0.98rem] leading-8 text-slate-600 dark:text-slate-300 md:text-base">
            The page may have moved, the link may be outdated, or the URL may be typed incorrectly. Head back to the main experience and continue browsing projects, activities, and contact details.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="button-primary group">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            Back Home
          </Link>
          <Link href="/projects" className="button-secondary">
            Browse Projects
          </Link>
        </div>

        <div className="grid w-full gap-4 pt-2 md:grid-cols-3">
          <div className="metric-chip text-left">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Destination</p>
            <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Home</p>
          </div>
          <div className="metric-chip text-left">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Portfolio</p>
            <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Projects</p>
          </div>
          <div className="metric-chip text-left">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Need Help</p>
            <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Contact</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;