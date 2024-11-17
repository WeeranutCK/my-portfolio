'use client';

import { useTheme } from '@/context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { GoProjectRoadmap } from 'react-icons/go';

export const Introduction: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-evenly items-center h-1/2 gap-20">
      <div className="flex flex-col justify-center items-start gap-3 font-bold">
        <div className="text-3xl">My name is</div>
        <div className="text-5xl font-black">
          Weeranut Chayakul
          <span> (Nate)</span>
        </div>
        <div className="pt-2 text-lg flex items-center gap-2">
          <Image
            src="/location-pin.png"
            alt="location pin"
            width={18}
            height={18}
            className={`-translate-y-1 ${
              theme === 'light' ? '' : 'brightness-0 invert'
            }`}
          />
          Computer Science Student at Kasetsart University, 2022 - Present
        </div>
        <div className="font-medium pt-3">
          Interest in Web Development and Machine Learning
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => {}}
            className={`mt-4 px-4 py-3 text-white font-semibold rounded flex items-center gap-2 ${
              theme === 'dark'
                ? 'bg-[#A91D3A] hover:bg-[#C73659]'
                : 'bg-[#C73659] hover:bg-[#A91D3A]'
            }`}
          >
            <GoProjectRoadmap className="text-xl" />
            Explore My Project
          </button>
          <Link
            href="https://github.com/weeranutCK"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={`mt-4 px-4 py-3 text-white font-semibold rounded flex items-center gap-2 ${
                theme === 'light'
                  ? 'bg-[#333333] hover:bg-[#2b2b2b]'
                  : 'bg-[#2b2b2b] hover:bg-[#333333]'
              }`}
            >
              <FaGithub className="text-xl" />
              Visit My GitHub
            </button>
          </Link>
        </div>
        <div className="py-2">Last Update: 16 Nov 2024 02:49 AM</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/profile-image.jpeg"
          alt="weeranut's profile picture"
          className="rounded-full
            w-[180px] h-[180px]
            sm:w-[220px] sm:h-[220px]
            md:w-[280px] md:h-[280px]
            lg:w-[350px] lg:h-[350px]
            object-cover"
          width={350}
          height={350}
          priority
        />
      </div>
    </div>
  );
};

export default Introduction;
