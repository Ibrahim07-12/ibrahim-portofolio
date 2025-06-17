"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { LayoutGrid } from "../layoutgrid/layout-grid";
import dynamic from 'next/dynamic';

// Dynamically import Aurora for better initial load performance
const Aurora = dynamic(() => import("../Aurora/Aurora"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900" />
});

// Custom hook for reduced motion preference
function useReducedMotion(disableEffectsOnLowPower = true) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches && disableEffectsOnLowPower);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches && disableEffectsOnLowPower);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Legacy support
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [disableEffectsOnLowPower]);
  
  return prefersReducedMotion;
}

export interface StickyScrollProps {
  content: {
    title: string;
    description: string;
    layoutGridCards?: any[];
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
  disableEffectsOnLowPower?: boolean;
  onSectionChange?: (index: number) => void;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
  disableEffectsOnLowPower = true,
  onSectionChange,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const prefersReducedMotion = useReducedMotion(disableEffectsOnLowPower);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  
  // Validate content early
  if (!Array.isArray(content) || content.length === 0) {
    return (
      <div className="p-8 bg-gray-900 text-white rounded-lg">
        <p>No content available.</p>
      </div>
    );
  }
  
  // Handle error gracefully
  if (error) {
    return (
      <div className="p-8 bg-gray-900 text-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p>We couldn't load the interactive content. Please refresh the page to try again.</p>
      </div>
    );
  }
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  
  // Optimize the scroll handler with useCallback and optional RAF
  const updateActiveCard = useCallback(
    (latest: number) => {
      const cardLength = content.length;
      const cardsBreakpoints = content.map((_, index) => index / cardLength);
      
      const closestBreakpointIndex = cardsBreakpoints.reduce(
        (acc, breakpoint, index) => {
          const distance = Math.abs(latest - breakpoint);
          if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
            return index;
          }
          return acc;
        }, 0
      );
      
      if (closestBreakpointIndex !== activeCard) {
        setActiveCard(closestBreakpointIndex);
        if (onSectionChange) {
          onSectionChange(closestBreakpointIndex);
        }
      }
    },
    [activeCard, content.length, onSectionChange]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Use requestAnimationFrame for smoother updates
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      updateActiveCard(latest);
    });
  });
  
  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);
  
  // Add keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        setActiveCard(prev => {
          const newIndex = Math.min(prev + 1, content.length - 1);
          if (onSectionChange) onSectionChange(newIndex);
          
          // Scroll to the appropriate position
          if (ref.current) {
            const scrollAmount = ref.current.scrollHeight * (newIndex / content.length);
            window.scrollTo({
              top: ref.current.offsetTop + scrollAmount,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
          
          return newIndex;
        });
        break;
      case "ArrowUp":
      case "ArrowLeft":
        setActiveCard(prev => {
          const newIndex = Math.max(prev - 1, 0);
          if (onSectionChange) onSectionChange(newIndex);
          
          // Scroll to the appropriate position
          if (ref.current) {
            const scrollAmount = ref.current.scrollHeight * (newIndex / content.length);
            window.scrollTo({
              top: ref.current.offsetTop + scrollAmount,
              behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
          }
          
          return newIndex;
        });
        break;
      default:
        break;
    }
  }, [content.length, onSectionChange, prefersReducedMotion]);

  // More optimized colors using CSS variables
  const backgroundColors = [
    "#1e293b", "#334155", "#475569", "#64748b", 
    "#0f172a", "#1e3a8a", "#1e40af", "#2563eb"
  ];

  // Calculate viewport-relative heights
  const sectionHeight = `calc(${content.length * 80}vh + 20vh)`;
  
  try {
    return (
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.8,
          ease: "easeInOut",
        }}
        className="relative overflow-hidden focus:outline-none"
        style={{
          background: `linear-gradient(135deg, ${
            backgroundColors[activeCard % backgroundColors.length]
          } 0%, #0f172a 100%)`,
          height: sectionHeight,
          willChange: 'background-color', // Add will-change for smoother color transitions
        }}
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Scrollable content sections"
        onKeyDown={handleKeyDown}
      >
        {/* Aurora Background with reduced opacity for better contrast */}
        <div className="absolute inset-0 w-full h-full opacity-40">
          {!prefersReducedMotion && (
            <Aurora
              colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
              blend={0.3}
              amplitude={1.2}
              speed={0.3}
            />
          )}
        </div>
        
        {/* Container with flex layout - improved for responsiveness */}
        <div className="relative z-10 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-12 px-4 md:px-8 py-8 md:py-12">
          
          {/* Left side - Text content */}
          <div className="w-full md:w-3/5 lg:max-w-2xl pt-4 md:pt-20"> 
            {content.map((item, index) => (
              <motion.div 
                key={`content-${index}`}
                className={`${prefersReducedMotion ? '' : 'md:h-[400px]'} flex flex-col justify-center`}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                }}
                id={`section-${index}`}
                aria-hidden={activeCard !== index}
              >
                <motion.h2
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.4,
                    y: activeCard === index || prefersReducedMotion ? 0 : 20,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: "easeOut",
                  }}
                  className="text-xl md:text-2xl font-semibold max-w-lg text-slate-200 leading-relaxed drop-shadow-md"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.4,
                    y: activeCard === index || prefersReducedMotion ? 0 : 20,
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    ease: "easeOut",
                    delay: 0.1,
                  }}
                  className="text-base md:text-lg mt-4 max-w-lg text-slate-200 leading-relaxed drop-shadow-md"
                >
                  {item.description}
                </motion.p>
              </motion.div>
            ))}
            <div className="h-8 md:h-16" />
          </div>

          {/* Right side - Responsive LayoutGrid */}
          <div className="w-full md:w-2/5 relative mt-8 md:mt-0">
            <motion.div
              animate={{
                y: activeCard * (prefersReducedMotion ? 0 : -400) * -1,
              }}
              transition={{
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: 250,
                damping: 25,
                duration: prefersReducedMotion ? 0.2 : 0.8,
              }}
              className="md:sticky top-20"
            >
              {content.map((item, index) => (
                <motion.div
                  key={`card-${index}`}
                  initial={prefersReducedMotion ? 
                    { opacity: 1, scale: 1 } : 
                    { opacity: 0.7, scale: 0.95, rotateY: 15 }
                  }
                  animate={
                    activeCard === index ?
                    (prefersReducedMotion ? 
                      { opacity: 1, scale: 1, zIndex: 10 } :
                      { opacity: 1, scale: 1, rotateY: 0, zIndex: 10 }
                    ) :
                    { opacity: 0, scale: 0.9, zIndex: 0 }
                  }
                  transition={{ 
                    duration: prefersReducedMotion ? 0.2 : 0.6, 
                    ease: "easeOut",
                    type: prefersReducedMotion ? "tween" : "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className={cn(
                    "overflow-hidden rounded-2xl absolute top-0 left-0 right-0 transform-gpu shadow-2xl",
                    "backdrop-blur-sm border border-white/10",
                    contentClassName,
                    // Responsive classes
                    "w-[280px] h-[280px] md:w-[320px] md:h-[320px] mx-auto md:mx-0"
                  )}
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    display: activeCard === index ? 'block' : 'none'
                  }}
                  aria-hidden={activeCard !== index}
                >
                  {item.layoutGridCards && item.layoutGridCards.length > 0 ? (
                    <LayoutGrid 
                      cards={item.layoutGridCards.map(card => ({
                        id: card.id || String(Math.random()),
                        content: card.content || null,
                        className: card.className || "",
                        thumbnail: card.thumbnail || ""
                      }))}
                    />
                  ) : item.content ? (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      {item.content}
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Space holder - make dynamic based on content */}
            <div className={`${prefersReducedMotion ? 'md:hidden' : ''}`} 
                style={{ height: prefersReducedMotion ? 'auto' : `${(content.length - 1) * 400}px` }} />
          </div>
        </div>
        
        {/* Add navigation dots for better visual feedback */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
          <div className="flex gap-2">
            {content.map((_, index) => (
              <button
                key={`nav-dot-${index}`}
                onClick={() => {
                  setActiveCard(index);
                  if (onSectionChange) onSectionChange(index);
                  
                  // Scroll to the appropriate position
                  if (ref.current) {
                    const scrollAmount = ref.current.scrollHeight * (index / content.length);
                    window.scrollTo({
                      top: ref.current.offsetTop + scrollAmount,
                      behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                  }
                }}
                aria-label={`Go to section ${index + 1}`}
                aria-current={activeCard === index ? "true" : "false"}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeCard === index 
                    ? "bg-white scale-125" 
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Skip navigation link for keyboard accessibility */}
        <div className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-30 focus-visible:top-4 focus-visible:left-4 focus-visible:bg-white focus-visible:text-black focus-visible:p-2 focus-visible:rounded">
          <a href="#main-content">Skip scroll section</a>
        </div>
      </motion.div>
    );
  } catch (err) {
    console.error("Error rendering StickyScroll:", err);
    setError(err instanceof Error ? err : new Error("Unknown error"));
    return null; // This return is needed but won't execute - the next render will show the error state
  }
};

export default StickyScroll;