const Footer = () => {
  return (
    <footer className="relative z-10 w-full px-6 pb-8 pt-2 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[28px] border border-black/10 bg-white/72 px-6 py-5 text-sm text-slate-500 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>
          © 2026 Weeranut Chayakul · Designed with white/black theme support.
        </p>
        <p className="font-medium uppercase tracking-[0.24em]">Portfolio v2</p>
      </div>
    </footer>
  );
};

export default Footer;
