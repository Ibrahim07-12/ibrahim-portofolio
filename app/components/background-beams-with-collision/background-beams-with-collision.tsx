"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Fixed: Changed from "motion/react" to "framer-motion"
import React, { useRef, useState, useEffect } from "react";
import dynamic from 'next/dynamic'; // ✅ Added: Import dynamic

interface BeamOptions {
  initialX?: number;
  translateX?: number;
  initialY?: number;
  translateY?: number;
  rotate?: number;
  className?: string;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
}

// ✅ Rename component for dynamic export
const BackgroundBeamsWithCollisionComponent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false); // ✅ Added: Client-side detection

  // ✅ Added: Client-side detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
  ];

  // ✅ Added: SSG/SSR placeholder
  if (!isMounted) {
    return (
      <div
        className={cn(
          "h-96 md:h-[40rem] bg-gradient-to-b from-slate-900 to-slate-800 relative flex items-center w-full justify-center overflow-hidden",
          className
        )}
      >
        {/* Static placeholder beams */}
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={`static-beam-${i}`}
            className="absolute h-72 w-px bg-gradient-to-t from-indigo-500/20 via-purple-500/20 to-transparent"
            style={{
              left: `${25 * i}%`,
              opacity: 0.7,
              transform: 'translateY(15%)'
            }}
          />
        ))}
        
        {/* Render children in placeholder */}
        {children}
        
        {/* Static bottom container */}
        <div
          className="absolute bottom-0 bg-slate-800 w-full inset-x-0 pointer-events-none"
          style={{
            boxShadow:
              "0 0 24px rgba(15, 23, 42, 0.3), 0 1px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(15, 23, 42, 0.2), 0 0 4px rgba(15, 23, 42, 0.3), 0 16px 68px rgba(15, 23, 42, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-96 md:h-[40rem] bg-gradient-to-b from-slate-900 to-slate-800 relative flex items-center w-full justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {/* Only render children if explicitly provided */}
      {children}
      
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-slate-800 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(15, 23, 42, 0.3), 0 1px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(15, 23, 42, 0.2), 0 0 4px rgba(15, 23, 42, 0.3), 0 16px 68px rgba(15, 23, 42, 0.4), 0 1px 0 rgba(255, 255, 255, 0.05) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: BeamOptions;
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ Added: Client-side detection
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null); // ✅ Added: Reference for cleanup

  // ✅ Added: Client-side detection
  useEffect(() => {
    setIsMounted(true);
    
    // ✅ Modified: Safe check for browser environment
    if (typeof window === 'undefined') return;
    
    const checkCollision = () => {
      // ✅ Modified: Safe check for refs and browser environment
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected &&
        typeof window !== 'undefined'
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    // Start checking only when mounted
    if (isMounted) {
      checkIntervalRef.current = setInterval(checkCollision, 50);
    }

    // ✅ Modified: Proper cleanup
    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, [cycleCollisionDetected, containerRef, parentRef, isMounted]);

  useEffect(() => {
    if (!isMounted) return; // ✅ Added: Skip if not mounted
    
    if (collision.detected && collision.coordinates) {
      const collisionTimeout = setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      const beamKeyTimeout = setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);

      // ✅ Added: Proper cleanup
      return () => {
        clearTimeout(collisionTimeout);
        clearTimeout(beamKeyTimeout);
      };
    }
  }, [collision, isMounted]);

  // ✅ Added: Skip rendering if not mounted
  if (!isMounted) return null;

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          y: beamOptions.initialY || "-200px",
          x: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            y: beamOptions.translateY || "1800px",
            x: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};

// ✅ Added: Export with dynamic import
export const BackgroundBeamsWithCollision = dynamic(
  () => Promise.resolve(BackgroundBeamsWithCollisionComponent),
  { ssr: false }
);

export default BackgroundBeamsWithCollision;