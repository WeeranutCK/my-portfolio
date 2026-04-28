'use client';

import SafeExternalLink from '@/components/SafeExternalLink';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowRight, FiGithub, FiMapPin } from 'react-icons/fi';

export const Introduction: React.FC = () => {
  return (
    <section id="home" className="section-shell relative w-full px-6 pb-16 pt-4 sm:pt-6 md:px-10 md:pb-24 md:pt-8 lg:px-14 lg:pt-10">
      <div className="pointer-events-none absolute left-[-10%] top-[10%] h-64 w-64 rounded-full bg-[hsl(var(--primary)/0.16)] blur-3xl accent-orb" />
      <div className="pointer-events-none absolute bottom-[8%] right-[-4%] h-72 w-72 rounded-full bg-[hsl(var(--accent)/0.14)] blur-3xl accent-orb" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="relative z-10 animate-fade-in-up space-y-8">
          <div className="eyebrow">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />
            <span>Available for 2026 opportunities</span>
          </div>

          <div className="space-y-6">
            <p className="max-w-2xl text-[0.78rem] font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 md:text-[0.82rem]">
              Engineering reliable products with strong UX, scalable architecture, and clean execution.
            </p>
            <h1 className="max-w-4xl text-[clamp(1.8rem,8vw,3.2rem)] font-bold leading-[0.96] text-slate-950 dark:text-white sm:text-[clamp(2.2rem,6.5vw,3.8rem)] lg:text-[clamp(3rem,4.6vw,4.1rem)]">
              Modern digital experiences with a systems-first mindset.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              I&apos;m <span className="font-semibold text-slate-950 dark:text-white">Weeranut Chayakul</span>, a computer science graduate and software engineer in Bangkok with hands-on experience across full-stack development, distributed systems, and backend services from university projects and SCB TECH X.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="tag gap-2"><FiMapPin className="text-[hsl(var(--primary))]" /> Bangkok, Thailand</span>
            <span className="tag">Kasetsart University &middot; 3.83 GPA</span>
            <span className="tag">Open to software engineer roles</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className="button-primary group">
              View Projects
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="#contact" className="button-secondary">
              Let&apos;s Connect
            </a>
            <SafeExternalLink href="https://github.com/WeeranutCK" className="button-secondary">
              <FiGithub className="text-base" />
              GitHub
            </SafeExternalLink>
          </div>

          <div className="grid gap-4 pt-2 sm:grid-cols-3">
            <div className="metric-chip">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Focus</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Frontend + Backend</p>
            </div>
            <div className="metric-chip">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Approach</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Scalable + practical</p>
            </div>
            <div className="metric-chip">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Stack</p>
              <p className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">Next.js &middot; NestJS &middot; Go &middot; Spring Boot</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-in-up" style={{ animationDelay: '120ms' }}>
          <div className="surface relative overflow-hidden p-5 md:p-7">
            <div className="absolute inset-x-6 top-6 flex items-center justify-between rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-slate-500 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300">
              <span>Portfolio / 2026</span>
              <span>White &harr; Black</span>
            </div>

            <div className="grid gap-6 pt-14">
              <div className="relative mx-auto overflow-hidden rounded-[28px] border border-black/10 bg-slate-950/5 p-3 dark:border-white/10 dark:bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(var(--primary)/0.16)] via-transparent to-[hsl(var(--accent)/0.16)]" />
                <Image
                  src="/profile-image.jpg"
                  alt="Weeranut Chayakul"
                  className="relative h-[300px] w-[270px] rounded-[22px] object-cover md:h-[380px] md:w-[330px]"
                  width={360}
                  height={420}
                  priority
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="surface-soft p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Now Building</p>
                  <p className="mt-3 text-base font-semibold text-slate-950 dark:text-white">Scalable apps, microservices, and infrastructure-minded product engineering.</p>
                </div>
                <div className="surface-soft p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Core Principles</p>
                  <p className="mt-3 text-base font-semibold text-slate-950 dark:text-white">Readable architecture, solid delivery, and thoughtful user experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
