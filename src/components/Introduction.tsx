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
    <div className="flex flex-col-reverse px-8 md:px-15 md:flex-row justify-evenly items-center min-h-[100svh] gap-5 md:gap-12 lg:gap-20 pt-20 lg:pt-0">
      <div className="flex flex-col justify-center items-start gap-2 md:gap-3 font-bold lg:max-w-[50%]">
        <div className="sm:text-base md:text-lg lg:text-3xl">My name is</div>
        <div className="sm:text-lg md:text-xl lg:text-3xl font-black">
          Weeranut Chayakul
          <span> (Nate)</span>  
        </div>
        <div className="lg:pt-2 text-sm lg:text-lg flex items-center gap-2">
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
        <div className="font-medium text-sm md:text-base pt-3">
          Interest in Web - Mobile Application Development and Machine Learning
        </div>
        <div className="flex gap-3 md:gap-5 text-xs md:text-sm lg:text-lg">
          <Link href="/projects">
            <button
              className={`mt-4 px-4 py-3 text-white font-semibold rounded flex items-center ${
                theme === 'dark'
                  ? 'bg-[#A91D3A] hover:bg-[#C73659]'
                  : 'bg-[#C73659] hover:bg-[#A91D3A]'
              }`}
            >
              <GoProjectRoadmap className="text-lg md:text-xl" />
              <div className="pl-2">
                <span className="hidden sm:inline pr-1">Explore</span>
                My Project
              </div>
            </button>
          </Link>
          <Link
            href="https://github.com/weeranutCK"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-base"
          >
            <button
              className={`mt-4 px-4 py-3 text-white font-semibold rounded flex items-center gap-2 ${
                theme === 'light'
                  ? 'bg-[#0c0b0b] hover:bg-[#2b2b2b]'
                  : 'bg-[#2b2b2b] hover:bg-[#333333]'
              }`}
            >
              <FaGithub className="text-lg" />
              Visit My GitHub
            </button>
          </Link>
        </div>
        <div className="py-4 md:py-2 text-sm md:text-base">
          Last Update: 4 Apr 2024 01:47 AM
        </div>
      </div>
      <div className="relative flex justify-center items-center">
        <Image
          src="/profile-image.jpg"
          alt="weeranut's profile picture"
          className="rounded-full
            w-[200px] h-[200px]
            sm:w-[190px] sm:h-[190px]
            md:w-[200px] md:h-[200px]
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
