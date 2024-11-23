"use client";

import Activities from "@/components/Activities";
import Introduction from "@/components/Introduction";
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-[200svh] ">
      <Introduction />
      <Activities />
    </div>
  );
};

export default Page;
