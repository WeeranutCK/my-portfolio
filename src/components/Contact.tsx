"use client";

import SafeExternalLink from '@/components/SafeExternalLink';
import { isHttpUrl } from '@/services/linkSecurity';
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Contact = () => {
  const contacts = [
    {
      label: 'Email',
      value: 'weeranut.ck@gmail.com',
      href: 'mailto:weeranut.ck@gmail.com',
      icon: FiMail,
    },
    {
      label: 'Phone',
      value: '+66 61-9935512',
      href: 'tel:+66619935512',
      icon: FiPhone,
    },
    {
      label: 'LinkedIn',
      value: 'Weeranut Chayakul',
      href: 'https://www.linkedin.com/in/weeranut-chayakul-140a32332/',
      icon: FiLinkedin,
    },
    {
      label: 'GitHub',
      value: 'github.com/WeeranutCK',
      href: 'https://github.com/WeeranutCK',
      icon: FiGithub,
    },
  ];

  return (
    <section id="contact" className="section-shell w-full px-6 py-20 md:px-10 md:py-24 lg:px-14">
      <div className="surface mx-auto max-w-7xl overflow-hidden p-7 md:p-10 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-6">
            <div className="eyebrow">Contact</div>
            <h2 className="text-[clamp(1.9rem,3.5vw,3rem)] font-bold leading-[1.02] text-slate-950 dark:text-white">
              Let’s build something sharp, useful, and memorable.
            </h2>
            <p className="max-w-xl text-[0.98rem] leading-8 text-slate-600 dark:text-slate-300 md:text-base">
              If you’re hiring, collaborating, or just want to talk about product engineering, competitive programming, or technical communities, I’d love to hear from you.
            </p>
            <SafeExternalLink
              href="https://canva.link/rz63ktg99mn8nop"
              className="button-primary"
            >
              View Resume
              <FiArrowUpRight />
            </SafeExternalLink>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {contacts.map(({ label, value, href, icon: Icon }) => (
              <SafeExternalLink
                key={label}
                href={href}
                openInNewTab={isHttpUrl(href)}
                className="surface-soft group flex min-w-0 items-start gap-4 overflow-hidden p-5 md:p-6"
              >
                <span className="rounded-2xl bg-[hsl(var(--primary)/0.12)] p-3 text-[hsl(var(--primary))]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 space-y-2">
                  <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="block break-all text-[0.95rem] font-semibold leading-7 text-slate-950 dark:text-white sm:break-words sm:text-base">{value}</span>
                </span>
              </SafeExternalLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
