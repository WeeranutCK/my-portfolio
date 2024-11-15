'use client';

import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Introduction from "@/components/Introduction";
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-full">
      <Introduction />
      <Certificates />
      <Contact />
    </div>
  );
};

export default Page;
