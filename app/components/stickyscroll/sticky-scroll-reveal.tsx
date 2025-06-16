"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "../layoutgrid/layout-grid";
import Aurora from "../Aurora/Aurora"; // Import Aurora

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    layoutGridCards?: any[];
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Warna background yang disesuaikan dengan tema website Anda
  const backgroundColors = [
    "#1e293b", // slate-800 - biru gelap utama
    "#334155", // slate-700 - biru gelap lebih terang
    "#475569", // slate-600 - biru abu-abu
    "#64748b", // slate-500 - biru abu-abu terang
    "#0f172a", // slate-900 - biru sangat gelap
    "#1e3a8a", // blue-800 - biru navy
    "#1e40af", // blue-700 - biru klasik
    "#2563eb", // blue-600 - biru cerah
  ];

 return (
  <motion.div
    animate={{
      backgroundColor: backgroundColors[activeCard % backgroundColors.length],
    }}
    transition={{
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="relative overflow-hidden"
    style={{
      background: `linear-gradient(135deg, ${backgroundColors[activeCard % backgroundColors.length]} 0%, #0f172a 100%)`,
      height: `${content.length * 400 + 300}px`,
    }}
    ref={ref}
  >
    {/* Aurora Background - di layer paling belakang */}
    <div className="absolute inset-0 w-full h-full opacity-60">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.3}
        amplitude={1.2}
        speed={0.3}
      />
    </div>

    {/* Overlay gelap untuk menjaga readability */}
    <div className="absolute inset-0 bg-black/20 z-[1]"></div>

    {/* Overlay pattern untuk menambah tekstur */}
    <div 
      className="absolute inset-0 opacity-10 z-[2]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}
    />
    
   {/* Container with flex layout */}
<div className="relative z-10 flex justify-center items-start gap-12 px-8 py-12">
    
    {/* Left side - Text content */}
     <div className="w-3/5 max-w-2xl pt-20"> 
      {content.map((item, index) => (
        <motion.div 
          key={item.title + index} 
          className="h-[400px] flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeCard === index ? 1 : 0.3,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeCard === index ? 1 : 0.4,
              y: activeCard === index ? 0 : 20,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
             className="text-2xl font-semibold max-w-lg text-slate-200 leading-relaxed drop-shadow-md"
          >
             {item.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activeCard === index ? 1 : 0.4,
              y: activeCard === index ? 0 : 20,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: 0.1,
            }}
             className="text-lg mt-4 max-w-lg text-slate-200 leading-relaxed drop-shadow-md"
          >
               {item.description}
          </motion.p>
        </motion.div>
      ))}
      <div className="h-16" />
    </div>

        {/* Right side - Single LayoutGrid yang bergerak smooth mengikuti section aktif */}
         <div className="w-2/5 relative">
          <motion.div
            animate={{
              y: activeCard * 400,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
              duration: 0.8,
            }}
              className="sticky top-20"
             >
            <motion.div
              key={activeCard}
              initial={{ opacity: 0.7, scale: 0.95, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className={cn(
                "h-80 w-80 overflow-hidden rounded-2xl relative transform-gpu shadow-2xl",
                "backdrop-blur-sm border border-white/10",
                contentClassName,
              )}
              style={{ 
                width: '320px',
                height: '320px',
                minWidth: '320px', 
                minHeight: '320px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Gradient overlay untuk memberikan efek depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none z-10" />
              
              {/* LayoutGrid rendered directly without container div */}
              {content[activeCard]?.layoutGridCards && (
                <LayoutGrid cards={content[activeCard].layoutGridCards} />
              )}
              
              {/* Fallback untuk content biasa jika tidak ada layoutGridCards */}
              {!content[activeCard]?.layoutGridCards && content[activeCard]?.content && (
                <div className="h-full w-full flex items-center justify-center p-4 relative z-0">
                  {content[activeCard].content}
                </div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Space holder for scrolling */}
          <div style={{ height: `${content.length * 400 + 200}px` }} />
        </div>
      </div>
    </motion.div>
  );
};