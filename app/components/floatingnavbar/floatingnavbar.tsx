"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import GooeyNav from "../GooeyNav/GooeyNav";

export const FloatingNav = ({
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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
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
        
        /* Override GooeyNav styles */
        .floating-nav-wrapper nav {
          background: transparent !important;
          border-radius: 9999px !important;
          margin: 0 !important;
        }
        
        .floating-nav-wrapper nav ul {
          background: transparent !important;
          padding: 0.25rem 0.5rem !important;
          margin: 0 !important;
          border-radius: 9999px !important;
          display: flex !important;
          align-items: center !important;
          gap: 0.25rem !important;
        }
        
        .floating-nav-wrapper nav ul li {
          color: rgba(255, 255, 255, 0.7) !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          padding: 0.5rem 1rem !important;
          border-radius: 9999px !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
          white-space: nowrap !important;
        }
        
        .floating-nav-wrapper nav ul li:hover {
          color: rgba(255, 255, 255, 0.9) !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }
        
        .floating-nav-wrapper nav ul li.active {
          color: rgba(15, 23, 42, 0.9) !important;
          background: rgba(255, 255, 255, 0.95) !important;
          font-weight: 600 !important;
        }
        
        /* Override effect styles */
        .floating-nav-wrapper .effect.filter::after {
          background: rgba(255, 255, 255, 0.95) !important;
          border-radius: 9999px !important;
          backdrop-filter: blur(8px) !important;
        }
        
        .floating-nav-wrapper .effect.text {
          color: rgba(255, 255, 255, 0.7) !important;
          font-weight: 500 !important;
          font-size: 0.875rem !important;
        }
        
        .floating-nav-wrapper .effect.text.active {
          color: rgba(15, 23, 42, 0.9) !important;
          font-weight: 600 !important;
        }
        
        /* Hide default particles if they interfere */
        .floating-nav-wrapper canvas {
          opacity: 0.6 !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    return () => {
      // Cleanup on unmount
      const style = document.getElementById(styleId);
      if (style) {
        style.remove();
      }
    };
  }, []);

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