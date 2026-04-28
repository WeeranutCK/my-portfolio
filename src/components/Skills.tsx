'use client';

import React from 'react';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'C', 'C++', 'Python', 'Go', 'Dart', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Frontend',
    skills: ['Next.js', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    skills: ['Spring Boot', 'NestJS', 'Kafka', 'RabbitMQ', 'Redis'],
  },
  {
    title: 'Database',
    skills: ['MySQL', 'PostgreSQL', 'Prisma', 'MinIO'],
  },
  {
    title: 'Security',
    skills: ['HashiCorp Vault', 'WireGuard VPN', 'AWS VPN', 'Cisco'],
  },
  {
    title: 'Testing',
    skills: ['JUnit', 'Jest', 'Playwright'],
  },
  {
    title: 'DevOps & Infra',
    skills: ['Kubernetes', 'Docker', 'Jenkins', 'Traefik'],
  },
  {
    title: 'Tools & AI',
    skills: ['Git', 'Jira', 'Agile/Scrum', 'GitHub Copilot', 'ChatGPT', 'Claude', 'Gemini'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-shell w-full px-6 py-20 md:px-10 md:py-24 lg:px-14">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        <div className="surface animate-fade-in-up p-7 md:p-9 lg:sticky lg:top-32 lg:h-fit">
          <div className="section-heading space-y-6">
            <div className="eyebrow">Capabilities</div>
            <h2 className="text-slate-950 dark:text-white">A practical stack for product, platform, and performance.</h2>
            <p className="text-[0.98rem] leading-8 text-slate-600 dark:text-slate-300 md:text-base">
              I work across the full delivery path—from interface design systems to infrastructure and messaging systems—so products stay cohesive from idea to deployment.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="surface-soft p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Frontend</p>
              <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">Responsive, modern, theme-aware UI.</p>
            </div>
            <div className="surface-soft p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Backend</p>
              <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">Scalable APIs with Spring Boot, queues, caching, and event-driven flows.</p>
            </div>
            <div className="surface-soft p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Ops</p>
              <p className="mt-2 text-base font-semibold text-slate-950 dark:text-white">Containerized delivery, cloud infrastructure, and observability.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="modern-card animate-fade-in-up p-7 md:p-8"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                  {category.title}
                </h3>
                <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
                  {category.skills.length} items
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span key={`${category.title}-${skill}`} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
