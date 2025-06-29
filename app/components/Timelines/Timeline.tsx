"use client";
import Beams from "../Beams/Beams";
import { ClientOnly } from "../ClientOnly";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
   const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full min-h-screen font-sans relative" ref={containerRef}>
      {/* Background Layer (z-[1]) */}
       <div className="absolute inset-0 z-[1]">
        <ClientOnly>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#6366F1"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={45}
        />
        </ClientOnly>
      </div>
      <div className="absolute inset-0 z-[2]">
      </div>
      
      {/* Content layer */}
      <div className="relative z-[3]">
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 z-30">
          <h2 className="text-3xl md:text-6xl mb-4 font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            {t("Education")}
          </h2>
        </div>

        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {data.map((item, index) => (
      <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
        <div className="sticky flex flex-col md:flex-row z-20 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
          {/* Updated timeline dot with gradient */}
          <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center p-[2px]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400" />
            </div>
          </div>
          <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            {item.title}
          </h3>
        </div>
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                  {item.title}
                </h3>
                <div className="text-white">
                  {item.content}
                </div>
              </div>
            </div>
          ))}
          
          {/* Timeline line */}
          <div
      style={{
        height: height + "px",
      }}
      className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
    >
      <div className="h-full w-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent opacity-30" />
      <motion.div
        style={{
          height: heightTransform,
          opacity: opacityTransform,
        }}
        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-indigo-400 via-purple-400 to-pink-400"
      />
          </div>
        </div>
      </div>
    </div>
  );
};