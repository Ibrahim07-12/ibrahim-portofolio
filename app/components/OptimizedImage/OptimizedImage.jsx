'use client'
import { useState, useEffect } from "react";
import Image from "next/image";

export const OptimizedImage = ({ 
  src, 
  alt, 
  width = 400, 
  height = 300, 
  className = "", 
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  
  useEffect(() => {
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

  return (
    <div className={`image-container ${className}`}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={alt || "Image"}
          width={width}
          height={height}
          quality={80}
          loading={priority ? "eager" : "lazy"}
          className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QJIiBwAAAABJRU5ErkJggg=="
        />
      ) : (
        <div className="bg-gray-200 animate-pulse rounded-md h-full w-full" />
      )}
    </div>
  );
};