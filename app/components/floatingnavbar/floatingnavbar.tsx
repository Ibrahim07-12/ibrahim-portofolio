"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"; // ✅ Fixed: Import from framer-motion
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic'; // ✅ Added: Import dynamic
import GooeyNav from "../GooeyNav/GooeyNav";

// ✅ Renamed: Component for dynamic export
const FloatingNavComponent = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ Added: Client-side detection

  // ✅ Added: Client-side detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (!isMounted) return; // ✅ Added: Skip if not mounted
    
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  // Convert navItems to GooeyNav format
  const gooeyNavItems = navItems.map(item => ({
    label: item.name,
    href: item.link
  }));

  // Inject styles after component mounts
  useEffect(() => {
    // ✅ Fixed: Safe check for client-side and document
    if (!isMounted || typeof document === 'undefined') return;
    
    const styleId = 'floating-nav-styles';
    let existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        :root {
          --color-1: #64748b !important;
          --color-2: #94a3b8 !important;
          --color-3: #cbd5e1 !important;
        }
        
        /* Override GooeyNav container */
        .floating-nav-wrapper {
          background: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 9999px !important;
          padding: 0.5rem !important;
        }
        
        /* ... rest of CSS styles ... */
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // ✅ Fixed: Safe cleanup
      if (typeof document === 'undefined') return;
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, [isMounted]); // ✅ Fixed: Add isMounted to dependencies

  // ✅ Added: Simple placeholder for SSG/SSR
  if (!isMounted) {
    return (
      <div
        className={cn(
          "hidden", // Hide during SSG
          className
        )}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto z-[5000]",
          className
        )}
      >
        <div className="floating-nav-wrapper">
          <GooeyNav 
            items={gooeyNavItems}
            animationTime={300}
            particleCount={6}
            particleDistances={[35, 5]}
            particleR={40}
            timeVariance={100}
            colors={[1, 2, 3]}
            initialActiveIndex={0}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ✅ Added: Export with dynamic import
export const FloatingNav = dynamic(() => Promise.resolve(FloatingNavComponent), {
  ssr: false
});