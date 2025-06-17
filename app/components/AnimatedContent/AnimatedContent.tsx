'use client'

import React, { useRef, useEffect, useState, ReactNode } from "react";
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic

// ❌ Don't import and register GSAP at module level
// gsap.registerPlugin(ScrollTrigger); 

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string | ((progress: number) => number);
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string; // ✅ Add: Optional className for better styling
}

const AnimatedContentComponent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false); // ✅ Add: Client-side detection

  useEffect(() => {
    setIsMounted(true);
    
    // ✅ Move GSAP registration inside useEffect
    // Only import and use GSAP in the browser
    const initGSAP = async () => {
      try {
        // Dynamically import GSAP only in browser
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        // Register plugin
        gsap.registerPlugin(ScrollTrigger);
        
        const el = ref.current;
        if (!el) return;

        const axis = direction === "horizontal" ? "x" : "y";
        const offset = reverse ? -distance : distance;
        const startPct = (1 - threshold) * 100;

        gsap.set(el, {
          [axis]: offset,
          scale,
          opacity: animateOpacity ? initialOpacity : 1,
        });

        gsap.to(el, {
          [axis]: 0,
          scale: 1,
          opacity: 1,
          duration,
          ease,
          delay,
          onComplete,
          scrollTrigger: {
            trigger: el,
            start: `top ${startPct}%`,
            toggleActions: "play none none none",
            once: true,
          },
        });

        return () => {
          // Clean up animations
          ScrollTrigger.getAll().forEach((t) => t.kill());
          gsap.killTweensOf(el);
        };
      } catch (error) {
        console.error("Error initializing GSAP:", error);
      }
    };

    if (isMounted) {
      initGSAP();
    }
    
  }, [
    isMounted, // ✅ Add: Depend on isMounted
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    onComplete,
  ]);

  // ✅ Add: Render the same layout during SSR to prevent layout shift
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// ✅ Export with dynamic import to avoid SSR issues
export default dynamic(() => Promise.resolve(AnimatedContentComponent), {
  ssr: false
});