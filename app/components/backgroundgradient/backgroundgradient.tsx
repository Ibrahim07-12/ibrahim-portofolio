'use client';

import { cn } from "@/lib/utils";
import React, { useRef, useEffect, useState } from "react"; // ✅ Add useState and useEffect
import { motion } from "framer-motion"; // ✅ Fixed: Change from "motion/react"
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic

// ✅ Rename component for dynamic export
const BackgroundGradientComponent = ({
  children,
  className = "",
  containerClassName = "",
  wrapperClassName = "",
  imgClassName = "",
  imgContainerClassName = "",
  imgSize = 80, // percentage of container size
  animate = true,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  wrapperClassName?: string;
  imgClassName?: string;
  imgContainerClassName?: string;
  imgSize?: number;
  animate?: boolean;
  [key: string]: any;
}) => {
  const backgroundGradientRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false); // ✅ Add: Client-side detection
  
  // ✅ Add: Client-side detection
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  // ✅ Add: SSG/SSR fallback with static gradient
  if (!isMounted) {
    return (
      <div
        className={cn(
          "group/bg-gradient relative h-full w-full cursor-pointer rounded-xl p-1.5",
          containerClassName
        )}
        {...props}
      >
        {/* Static gradient background */}
        <div className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-80",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}/>
        
        {/* Content container */}
        <div className={cn(
          "relative flex h-full w-full items-center justify-center rounded-lg bg-slate-900 p-2 z-10",
          wrapperClassName
        )}>
          <div className={cn(
            "flex items-center justify-center w-full h-full overflow-hidden", 
            imgContainerClassName
          )}>
            {/* Static rendering of children */}
            {React.Children.map(children, child => {
              if (React.isValidElement(child) && 
                  ((typeof child.type === 'string' && child.type === 'img') || 
                  (child.props && child.props.src))) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  className: cn(
                    `object-contain m-auto`,
                    (child.props as any).className,
                    imgClassName
                  ),
                  style: {
                    ...((child.props as any).style || {}),
                    maxWidth: `${imgSize}%`,
                    maxHeight: `${imgSize}%`,
                    objectFit: 'contain' as const
                  }
                });
              }
              return child;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={backgroundGradientRef}
      className={cn(
        "group/bg-gradient relative h-full w-full cursor-pointer rounded-xl p-1.5 transition duration-200",
        containerClassName
      )}
      {...props}
    >
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      {/* Logo container with improved sizing */}
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-lg bg-slate-900 p-2 z-10",
          wrapperClassName
        )}
      >
        {/* Image container with explicit sizing constraints */}
        <div className={cn(
          "flex items-center justify-center w-full h-full overflow-hidden", 
          imgContainerClassName
        )}>
          {/* Check if child is an image element and add custom styling */}
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && 
                ((typeof child.type === 'string' && child.type === 'img') || 
                 (child.props && child.props.src))) {
              // If it's an image, wrap it with sizing constraints
              return React.cloneElement(child as React.ReactElement<any>, {
                className: cn(
                  `object-contain m-auto`,
                  (child.props as any).className,
                  imgClassName
                ),
                style: {
                  ...((child.props as any).style || {}),
                  maxWidth: `${imgSize}%`,
                  maxHeight: `${imgSize}%`,
                  objectFit: 'contain' as const
                }
              });
            }
            return child;
          })}
        </div>
      </div>
    </div>
  );
};

// ✅ Add: Export with dynamic import
export const BackgroundGradient = dynamic(() => Promise.resolve(BackgroundGradientComponent), {
  ssr: false
});