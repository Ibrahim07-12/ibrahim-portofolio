"use client";
import { cn } from "@/lib/utils";
import { motion, MotionValue, Transition, useSpring } from "framer-motion"; // ✅ Add: Import useSpring
import React, { useState, useEffect } from "react"; // ✅ Add: Import useState, useEffect
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic

// Use the imported easing function
const transition: Transition = {
  duration: 0,
  ease: "linear" as any  // Type casting to bypass type checking (not ideal but works)
};

// ✅ Rename: Component for dynamic export
const GoogleGeminiEffectComponent = ({
  pathLengths,
  title,
  description,
  className,
}: {
  pathLengths: MotionValue<number>[];
  title?: string;
  description?: string;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false); // ✅ Add: Client-side detection
  
  // ✅ Add: Client-side detection effect
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // ✅ Add: Static placeholder for SSG/SSR
  if (!isMounted) {
    return (
      <div className={cn("relative w-full h-32", className)}>
        <svg
          width="100%"
          height="128"
          viewBox="0 0 1440 128"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Static paths for SSG */}
          <path
            d="M0 64C150.5 64 261 64.318 323.5 82.5C351 90.5 387.517 110.001 423.5 120.5C447.371 127.465 472 129.735 487 133.735C503.786 138.212 504.5 142.808 523 144.735C547 147.235 564.814 127.235 584.5 127.235C604.5 127.235 626 155.069 643 154.569C658.676 154.569 672.076 137.63 695.751 127.972C703.017 125.008 711.231 124.208 718.298 127.617C735.448 135.889 751.454 155.98 767 155.569C783.364 155.569 801.211 133.687 819.903 126.657C825.718 124.469 832.141 125.104 837.992 127.194C859.178 134.764 873.089 149.365 891 149.735C907.8 150.083 923 130.235 963 132.735C1034.5 132.735 1047.5 118.68 1071 107.5C1122.5 83 1142.23 78.871 1185 72.5C1255.5 62 1294 65 1439.5 65"
            stroke="#4FABFF"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
            strokeDasharray="5,5"
          />
          
          <path
            d="M0 96C147.5 96.333 294.5 95.735 380.5 95.735C405.976 96.94 422.849 97.228 436.37 97.123C477.503 96.803 518.631 88.605 559.508 93.197C564.04 93.706 569.162 94.524 575 95.735C588 98.433 616 103.702 627.5 101.402C647.5 97.402 659 81.235 680.5 81.235C700.5 81.235 725 111.235 742 110.735C757.654 110.735 768.77 92.583 791.793 82.59C798.991 79.465 807.16 78.777 814.423 81.745C832.335 89.064 850.418 106.648 866 106.235C882.791 106.235 902.316 91.786 921.814 87.392C926.856 86.255 932.097 86.674 937.176 87.631C966.993 93.248 970.679 96.346 989.5 96.735C1006.3 97.083 1036.5 95.235 1055.5 95.235C1114.5 95.235 1090.5 95.235 1124 95.235C1177.5 95.235 1178.99 96.402 1241 96.402C1317.5 96.402 1274.5 94.568 1440 95.235"
            stroke="#076EFF"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
            strokeDasharray="5,5"
          />

          {/* Path blur for background effect */}
          <path
            d="M0 64C150.5 64 261 64.318 323.5 82.5C351 90.5 387.517 110.001 423.5 120.5C447.371 127.465 472 129.735 487 133.735C503.786 138.212 504.5 142.808 523 144.735C547 147.235 564.814 127.235 584.5 127.235C604.5 127.235 626 155.069 643 154.569C658.676 154.569 672.076 137.63 695.751 127.972C703.017 125.008 711.231 124.208 718.298 127.617C735.448 135.889 751.454 155.98 767 155.569C783.364 155.569 801.211 133.687 819.903 126.657C825.718 124.469 832.141 125.104 837.992 127.194C859.178 134.764 873.089 149.365 891 149.735C907.8 150.083 923 130.235 963 132.735C1034.5 132.735 1047.5 118.68 1071 107.5C1122.5 83 1142.23 78.871 1185 72.5C1255.5 62 1294 65 1439.5 65"
            stroke="#4FABFF"
            strokeWidth="2"
            fill="none"
            filter="url(#blurMe)"
            opacity="0.2"
          />

          <defs>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
          </defs>
        </svg>
        
        {/* Show title and description in placeholder if provided */}
        {(title || description) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-white/70">{description}</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-32", className)}>
      {/* SVG with only blue paths */}
      <svg
        width="100%"
        height="128"
        viewBox="0 0 1440 128"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Only blue path is visible */}
        <motion.path
          d="M0 64C150.5 64 261 64.318 323.5 82.5C351 90.5 387.517 110.001 423.5 120.5C447.371 127.465 472 129.735 487 133.735C503.786 138.212 504.5 142.808 523 144.735C547 147.235 564.814 127.235 584.5 127.235C604.5 127.235 626 155.069 643 154.569C658.676 154.569 672.076 137.63 695.751 127.972C703.017 125.008 711.231 124.208 718.298 127.617C735.448 135.889 751.454 155.98 767 155.569C783.364 155.569 801.211 133.687 819.903 126.657C825.718 124.469 832.141 125.104 837.992 127.194C859.178 134.764 873.089 149.365 891 149.735C907.8 150.083 923 130.235 963 132.735C1034.5 132.735 1047.5 118.68 1071 107.5C1122.5 83 1142.23 78.871 1185 72.5C1255.5 62 1294 65 1439.5 65"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[0],
          }}
          transition={transition}
        />
        
        <motion.path
          d="M0 96C147.5 96.333 294.5 95.735 380.5 95.735C405.976 96.94 422.849 97.228 436.37 97.123C477.503 96.803 518.631 88.605 559.508 93.197C564.04 93.706 569.162 94.524 575 95.735C588 98.433 616 103.702 627.5 101.402C647.5 97.402 659 81.235 680.5 81.235C700.5 81.235 725 111.235 742 110.735C757.654 110.735 768.77 92.583 791.793 82.59C798.991 79.465 807.16 78.777 814.423 81.745C832.335 89.064 850.418 106.648 866 106.235C882.791 106.235 902.316 91.786 921.814 87.392C926.856 86.255 932.097 86.674 937.176 87.631C966.993 93.248 970.679 96.346 989.5 96.735C1006.3 97.083 1036.5 95.235 1055.5 95.235C1114.5 95.235 1090.5 95.235 1124 95.235C1177.5 95.235 1178.99 96.402 1241 96.402C1317.5 96.402 1274.5 94.568 1440 95.235"
          stroke="#076EFF"
          strokeWidth="2"
          fill="none"
          initial={{
            pathLength: 0,
          }}
          style={{
            pathLength: pathLengths[1],
          }}
          transition={transition}
        />

        {/* Path blur for background effect */}
        <path
          d="M0 64C150.5 64 261 64.318 323.5 82.5C351 90.5 387.517 110.001 423.5 120.5C447.371 127.465 472 129.735 487 133.735C503.786 138.212 504.5 142.808 523 144.735C547 147.235 564.814 127.235 584.5 127.235C604.5 127.235 626 155.069 643 154.569C658.676 154.569 672.076 137.63 695.751 127.972C703.017 125.008 711.231 124.208 718.298 127.617C735.448 135.889 751.454 155.98 767 155.569C783.364 155.569 801.211 133.687 819.903 126.657C825.718 124.469 832.141 125.104 837.992 127.194C859.178 134.764 873.089 149.365 891 149.735C907.8 150.083 923 130.235 963 132.735C1034.5 132.735 1047.5 118.68 1071 107.5C1122.5 83 1142.23 78.871 1185 72.5C1255.5 62 1294 65 1439.5 65"
          stroke="#4FABFF"
          strokeWidth="2"
          fill="none"
          pathLength={1}
          filter="url(#blurMe)"
          opacity="0.3"
        />

        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
      </svg>
      
      {/* Show title and description if provided */}
      {(title || description) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && <p className="text-sm text-white/70">{description}</p>}
        </div>
      )}
    </div>
  );
};

// ✅ Add: Create alternative component with default path lengths
export const GoogleGeminiEffectWithDefaults = ({
  title,
  description,
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) => {
  // ✅ Add: Create default spring animations that work in browser
  const [isMounted, setIsMounted] = useState(false);
  const [defaultPathLengths, setDefaultPathLengths] = useState<MotionValue<number>[]>([]);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Create default spring values for the paths
    const spring1 = useSpring(0, { stiffness: 100, damping: 30 });
    const spring2 = useSpring(0, { stiffness: 100, damping: 30 });
    
    setDefaultPathLengths([spring1, spring2]);
    
    // Animate the springs
    setTimeout(() => {
      spring1.set(1);
      setTimeout(() => {
        spring2.set(1);
      }, 300);
    }, 100);
  }, []);
  
  if (!isMounted || defaultPathLengths.length === 0) {
    // Return the static placeholder until we have our springs
    return (
      <div className={cn("relative w-full h-32", className)}>
        <svg
          width="100%"
          height="128"
          viewBox="0 0 1440 128"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Static paths with dashed styling */}
          <path
            d="M0 64C150.5 64 261 64.318 323.5 82.5C351 90.5 387.517 110.001 423.5 120.5C447.371 127.465 472 129.735 487 133.735C503.786 138.212 504.5 142.808 523 144.735C547 147.235 564.814 127.235 584.5 127.235C604.5 127.235 626 155.069 643 154.569C658.676 154.569 672.076 137.63 695.751 127.972C703.017 125.008 711.231 124.208 718.298 127.617C735.448 135.889 751.454 155.98 767 155.569C783.364 155.569 801.211 133.687 819.903 126.657C825.718 124.469 832.141 125.104 837.992 127.194C859.178 134.764 873.089 149.365 891 149.735C907.8 150.083 923 130.235 963 132.735C1034.5 132.735 1047.5 118.68 1071 107.5C1122.5 83 1142.23 78.871 1185 72.5C1255.5 62 1294 65 1439.5 65"
            stroke="#4FABFF"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.5"
          />
          {/* ... other static paths ... */}
        </svg>
        
        {/* Title and description in static version */}
        {(title || description) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
            {description && <p className="text-sm text-white/70">{description}</p>}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <GoogleGeminiEffectComponent
      pathLengths={defaultPathLengths}
      title={title}
      description={description}
      className={className}
    />
  );
};

// ✅ Add: Export with dynamic import
export const GoogleGeminiEffect = dynamic(() => Promise.resolve(GoogleGeminiEffectComponent), {
  ssr: false
});