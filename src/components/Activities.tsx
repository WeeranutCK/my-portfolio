"use client";

import { useTheme } from "@/context/ThemeContext";
import activityData from "@/data/activityData";
import { useEffect, useState } from "react";

interface Credit {
  name: string;
  link?: string;
}

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [images.length, isHovered]);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative w-full h-56 overflow-hidden rounded-t-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="w-full h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="p-2 m-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="p-2 m-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ImageCredit = ({ credit }: { credit: Credit }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex justify-end mt-auto text-right">
      <span className={`text-xs italic ${
        theme === "light" ? "text-gray-500" : "text-gray-400"
      }`}>
        Images by: {credit.link ? (
          <a 
            href={credit.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              theme === "light" 
                ? "text-blue-600 hover:text-blue-700" 
                : "text-blue-400 hover:text-blue-300"
            }`}
          >
            {credit.name}
          </a>
        ) : (
          credit.name
        )}
      </span>
    </div>
  );
};

const Activities = () => {
  const { theme } = useTheme();
  return (
    <div className={`w-full h-1/2 p-8 md:p-14 ${
      theme === "light" ? "bg-[#FAF9F6]" : "bg-[#1c1c1c]"
    }`}>
      <div className="max-w-[1400px] mx-auto h-full flex flex-col">
        <div className="text-xl md:text-2xl font-bold mb-8">Recent Activities</div>
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
            {activityData.map((activity, index) => (
              <div
                key={index}
                className={`flex flex-col h-[400px] rounded-lg transition-all duration-300 ${
                  theme === "light"
                    ? "bg-white shadow-md hover:shadow-lg"
                    : "bg-[#2d2d2d] shadow-dark hover:shadow-lg"
                }`}
              >
                <ImageCarousel images={activity.images} />
                <div className="flex flex-col flex-grow p-4">
                  <h3 className="font-medium text-lg md:text-xl line-clamp-3 md:line-clamp-2 mb-2">{activity.name}</h3>
                  <p className={`text-sm line-clamp-4 mb-2 ${
                    theme === "light" ? "text-gray-600" : "text-gray-400"
                  }`}>
                    {activity.description}
                  </p>
                  <div className="mt-auto">
                    <span className={`block text-sm text-right mb-1 ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {activity.date}
                    </span>
                    <ImageCredit credit={activity.imageCredit} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
