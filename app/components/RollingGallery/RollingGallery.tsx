'use client'
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  ResolvedValues,
  AnimatePresence,
} from "framer-motion";

const IMGS: string[] = [
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.44.jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.45 (1).jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.45.jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.46 (1).jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.46.jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.47.jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.48 (1).jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.48 (2).jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.48.jpeg",
  "./images/work/amns/WhatsApp Image 2025-06-16 at 11.23.49.jpeg",
];

interface RollingGalleryProps {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
  spacing?: number;
}

const RollingGalleryComponent: React.FC<RollingGalleryProps> = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
  spacing = 10,
}) => {
  const galleryImages = images.length > 0 ? images : IMGS;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ Safe browser API usage with useState initializer
  const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);
  
  // ✅ Handle browser APIs in useEffect
  useEffect(() => {
    setMounted(true);
    
    // Only run on client-side
    if (typeof window !== 'undefined') {
      // Initialize screen size
      setIsScreenSizeSm(window.innerWidth <= 640);
      
      // Set up resize listener
      const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
      window.addEventListener("resize", handleResize);
      
      // Cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Adjusted cylinder size based on screen
  const cylinderWidth: number = isScreenSizeSm ? 800 : 1400;
  const faceCount: number = galleryImages.length;
  const faceWidth: number = (cylinderWidth / faceCount) * 1.1 - spacing;
  const radius: number = cylinderWidth / (2 * Math.PI);

  const dragFactor: number = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val: number) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle: number) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  // ✅ Safe autoplay setup in useEffect
  useEffect(() => {
    if (mounted && autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else if (mounted) {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, mounted]);

  const handleUpdate = (latest: ResolvedValues) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    setIsDragging(true);
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
    
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = (): void => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = (): void => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  const handleImageClick = (url: string) => {
    if (!isDragging) {
      setSelectedImage(url);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // ✅ Show a placeholder during SSR
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[200px] bg-gray-900/50 rounded-lg">
        <div className="text-white/70">Gallery loading...</div>
      </div>
    );
  }

  // ✅ Only render the full component after mounting on client
  return (
    <>
      <div className="relative h-full w-full overflow-hidden">
        {/* Side gradients */}
        <div
          className="absolute top-0 left-0 h-full w-[60px] z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(17, 24, 39, 0.9) 100%)",
          }}
        />
        <div
          className="absolute top-0 right-0 h-full w-[60px] z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(17, 24, 39, 0.9) 100%)",
          }}
        />

        {/* Interactive indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex gap-1.5">
          <motion.div
            className="w-6 h-1 bg-blue-500/70 rounded-full"
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="w-3 h-1 bg-purple-500/70 rounded-full"
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.3, ease: "easeInOut" }}
          />
          <motion.div
            className="w-3 h-1 bg-indigo-500/70 rounded-full"
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2/3 h-2/3 bg-blue-500/10 rounded-full blur-[80px] z-1"></div>
        </div>

        {/* Main cylinder container */}
        <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
          <motion.div
            drag="x"
            dragElastic={0}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={controls}
            onUpdate={handleUpdate}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d] active:cursor-grabbing"
            whileTap={{ scale: 0.98, cursor: "grabbing" }}
          >
            {galleryImages.map((url, i) => (
              <div
                key={i}
                className="group absolute flex h-fit items-center justify-center p-[1.5%] [backface-visibility:hidden] md:p-[1%]"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${(360 / faceCount) * i}deg) translateZ(${radius}px)`,
                }}
              >
                {/* Enhanced image container */}
                <div className="relative w-full h-full overflow-hidden">
                  {/* Subtle gradient border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-blue-500/30 via-purple-500/30 to-indigo-500/30 rounded-xl blur-[1px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Clickable image with hover effects */}
                  <div 
                    className="cursor-pointer relative" 
                    onClick={() => handleImageClick(url)}
                  >
                    <img
                      src={url}
                      alt="gallery"
                      className="h-[140px] w-[200px] rounded-lg border border-white/20 object-cover shadow-lg shadow-black/30 transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-blue-900/20 group-hover:border-white/30 sm:h-[120px] sm:w-[170px]"
                    />
                    
                    {/* View full size indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 rounded-lg">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Drag hint that fades out */}
        <motion.div 
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ repeat: 3, duration: 1.5, delay: 1, repeatType: "reverse" }}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-xs text-white/70 border border-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h1V8a5 5 0 0 0-5-5zm-3.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7z"/>
          </svg>
          <span>Drag to explore</span>
        </motion.div>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
      {selectedImage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="relative max-w-[80vw] max-h-[80vh]"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="object-contain max-w-[500px] max-h-[50vh] w-auto h-auto rounded-lg"
              style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.7)" }}
            />
            
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 p-2 text-white bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

// ✅ Export with dynamic import to avoid SSR
export default dynamic(() => Promise.resolve(RollingGalleryComponent), {
  ssr: false
});