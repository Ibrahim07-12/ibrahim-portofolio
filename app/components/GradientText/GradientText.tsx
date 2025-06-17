'use client'
import React, { ReactNode, useState, useEffect } from 'react'; // ✅ Add: useState, useEffect
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

// ✅ Rename: Component for dynamic export
const GradientTextComponent = ({
    children,
    className = "",
    colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
    animationSpeed = 8,
    showBorder = false,
}: GradientTextProps) => {
    const [isMounted, setIsMounted] = useState(false); // ✅ Add: Client-side detection
    
    // ✅ Add: Mount detection
    useEffect(() => {
        setIsMounted(true);
    }, []);
    
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    // ✅ Note: For this component, we don't actually need a different static version
    // since the initial render is visually similar. The animation will start after
    // hydration automatically.

    return (
        <div
            className={`relative flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer ${className}`}
        >
            {showBorder && (
                <div
                    className={`absolute inset-0 bg-cover z-0 pointer-events-none ${isMounted ? 'animate-gradient' : ''}`}
                    style={{
                        ...gradientStyle,
                        backgroundSize: "300% 100%",
                        // ✅ Add: Default background position for non-animated state
                        backgroundPosition: isMounted ? undefined : '0% 50%'
                    }}
                >
                    <div
                        className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
                        style={{
                            width: "calc(100% - 2px)",
                            height: "calc(100% - 2px)",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    ></div>
                </div>
            )}
            <div
                className={`inline-block relative z-2 text-transparent bg-cover ${isMounted ? 'animate-gradient' : ''}`}
                style={{
                    ...gradientStyle,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    backgroundSize: "300% 100%",
                    // ✅ Add: Default background position for non-animated state
                    backgroundPosition: isMounted ? undefined : '0% 50%'
                }}
            >
                {children}
            </div>
        </div>
    );
};

// ✅ Add: Export with dynamic import
const GradientText = dynamic(() => Promise.resolve(GradientTextComponent), { ssr: true });
export default GradientText;

// ✅ Note: Alternative approach - this component could also be made into a server component
// by removing the 'use client' directive and the isMounted state, since the animations
// will work after hydration automatically.

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         gradient: {
//           '0%': { backgroundPosition: '0% 50%' },
//           '50%': { backgroundPosition: '100% 50%' },
//           '100%': { backgroundPosition: '0% 50%' },
//         },
//       },
//       animation: {
//         gradient: 'gradient 8s linear infinite'
//       },
//     },
//   },
//   plugins: [],
// };