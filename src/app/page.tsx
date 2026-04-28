'use client';

import Activities from '@/components/Activities';
import Contact from '@/components/Contact';
import Introduction from '@/components/Introduction';
import Skills from '@/components/Skills';
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-start overflow-hidden">
      <Introduction />
      <Skills />
      <Activities />
      <Contact />
    </div>
  );
};

export default Page;
