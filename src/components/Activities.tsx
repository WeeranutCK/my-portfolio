'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';
import SafeExternalLink from '@/components/SafeExternalLink';
import activityData from '@/data/activityData';
import { Pagination } from './projects/Pagination';
import LoadingMiddleware from '@/middleware/LoadingMiddleware';
import { Activity } from '@/types/activity';
import { useUI } from '@/context/UIContext';

const ITEMS_PER_PAGE = 4;

const getImagePreviewName = (imagePath: string) => imagePath.split('/').pop() ?? imagePath;

const ImageCarousel = ({ images, onImageClick }: { images: string[], onImageClick: (img: string) => void }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const navigate = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!images || images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images]);

  useEffect(() => {
    startAutoplay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoplay]);

  if (!images || images.length === 0) return <div className="h-full w-full animate-pulse bg-[hsl(var(--muted))]" />;

  return (
    <div className="relative h-[280px] w-full overflow-hidden md:h-[320px]">
      {/* All images stay mounted — transitions are pure CSS opacity/transform, no remount lag */}
      {images.map((src, idx) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? 'scale(1)' : 'scale(1.03)',
            transition: 'opacity 700ms cubic-bezier(0.4,0,0.2,1), transform 700ms cubic-bezier(0.4,0,0.2,1)',
            pointerEvents: idx === current ? 'auto' : 'none',
          }}
        >
          <Image
            src={src}
            alt="activity"
            fill
            className="cursor-pointer object-cover"
            onClick={() => onImageClick(src)}
          />
        </div>
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 backdrop-blur-xl">
          {images.map((image, imageIndex) => (
            <button
              key={`${image}-${imageIndex}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(imageIndex);
                startAutoplay();
              }}
              className={`h-2 rounded-full transition-all duration-500 ${
                current === imageIndex ? 'w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
    </div>
  );
};

const ImageCredit = ({ credit }: { credit?: { name: string; link?: string } }) => {
  if (!credit) return null;
  const content = (
    <span className="text-[10px] opacity-40 hover:opacity-100 transition-opacity font-bold uppercase tracking-[0.2em] text-white dark:text-gray-400">
      Photo: {credit.name}
    </span>
  );

  if (credit.link) {
    return (
      <SafeExternalLink href={credit.link} className="z-10">
        {content}
      </SafeExternalLink>
    );
  }

  return content;
};

const Activities = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setNavbarVisible } = useUI();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
    setNavbarVisible(!selectedImage);

    return () => {
      document.body.style.overflow = '';
      setNavbarVisible(true);
    };
  }, [selectedImage, setNavbarVisible]);

  const totalPages = Math.ceil(activityData.length / ITEMS_PER_PAGE);
  const paginatedActivities = activityData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <LoadingMiddleware isLoading={isLoading}>
      <section id="activities" className="section-shell w-full px-6 py-20 md:px-10 md:py-24 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="section-heading mb-14 animate-fade-in-up space-y-6">
            <div className="eyebrow">Timeline</div>
            <h2 className="text-slate-950 dark:text-white">Recent activities, leadership, and community highlights.</h2>
            <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              A snapshot of hackathons, technical communities, and initiatives that shaped how I build, collaborate, and lead.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {paginatedActivities.map((activity: Activity) => {
              const animationOrder = activityData.findIndex(
                (item) => item.name === activity.name && item.date === activity.date
              );

              return (
                <article
                  key={`${activity.name}-${activity.date}`}
                  className="modern-card animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${animationOrder * 120}ms` }}
                >
                  <ImageCarousel images={activity.images} onImageClick={setSelectedImage} />
                  <div className="space-y-6 p-7 md:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--primary))]">
                        {activity.date}
                      </span>
                      <div className="h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))] opacity-80" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-[1.55rem] font-semibold leading-tight text-slate-950 dark:text-white md:text-[1.75rem]">
                        {activity.name}
                      </h3>
                      <p className="text-[0.98rem] leading-8 text-slate-600 dark:text-slate-300">
                        {activity.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-black/5 pt-5 dark:border-white/10">
                      <ImageCredit credit={activity.imageCredit} />
                      <button
                        type="button"
                        onClick={() => setSelectedImage(activity.images[0])}
                        className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-[hsl(var(--primary))] dark:text-slate-400"
                      >
                        Open image
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 border-t border-black/5 pt-10 dark:border-white/10">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-lg md:p-6">
            <button
              type="button"
              className="absolute inset-0 z-0"
              aria-label="Close image preview"
              onClick={() => setSelectedImage(null)}
            />
            <div className="relative z-10 h-full w-full max-w-6xl rounded-[28px] border border-white/10 bg-black/20 p-4 md:p-6">
              <Image src={selectedImage} alt="Selected activity" fill className="object-contain" />
              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-200 md:left-6 md:top-6">
                {getImagePreviewName(selectedImage)}
              </div>
              <button
                type="button"
                className="absolute right-4 top-4 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-slate-950/85 text-white shadow-lg md:right-6 md:top-6"
                aria-label="Close image preview"
                onClick={() => setSelectedImage(null)}
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </section>
    </LoadingMiddleware>
  );
};

export default Activities;
