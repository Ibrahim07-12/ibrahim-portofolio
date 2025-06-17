'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export const OptimizedImage = ({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = "", 
  priority = false,
  objectFit = "cover", // ✅ Added objectFit prop
  quality = 80        // ✅ Made quality configurable
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false); // ✅ Added error handling
  const [imageSrc, setImageSrc] = useState(priority ? src : "");
  const [isMounted, setIsMounted] = useState(false); // ✅ Added for SSG compatibility
  
  // ✅ Check for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setHasError(false);
    
    // Delay loading of non-priority images
    if (!priority) {
      const timer = setTimeout(() => {
        setImageSrc(src);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setImageSrc(src);
    }
  }, [src, priority]);

  // ✅ For SSG/SSR compatibility - return basic image without animations
  if (!isMounted) {
    return (
      <div className={`image-container relative ${className}`}>
        <Image
          src={src}
          alt={alt || "Image"}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          style={{ objectFit }} // ✅ Apply object-fit
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QJIiBwAAAABJRU5ErkJggg=="
        />
      </div>
    );
  }

  return (
    <div className={`image-container relative ${className}`}>
      {/* ✅ Show error state */}
      {hasError ? (
        <div className="bg-gray-200 flex items-center justify-center w-full h-full rounded-md">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt || "Image"}
          width={width}
          height={height}
          quality={quality}
          loading={priority ? "eager" : "lazy"}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          style={{ objectFit }} // ✅ Apply object-fit
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)} // ✅ Added error handler
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QJIiBwAAAABJRU5ErkJggg=="
        />
      ) : (
        <div className="bg-gray-200 animate-pulse rounded-md h-full w-full" />
      )}
    </div>
  );
};

// ✅ Add a default export for easier importing
export default OptimizedImage;