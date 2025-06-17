'use client'

import React, { useState, useEffect } from "react"; // ✅ Add: Import useState and useEffect
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic
// ❌ Remove: Don't import GSAP at module level
// import { gsap } from "gsap";

interface MenuItemProps {
  link: string;
  text: string | React.ReactNode;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

// ✅ Rename: For dynamic export
const FlowingMenuComponent: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  const [isMounted, setIsMounted] = useState(false); // ✅ Add: Client-side detection

  // ✅ Add: Client-side detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Add: Static placeholder for SSG
  if (!isMounted) {
    return (
      <div className="w-full h-full overflow-hidden">
        <nav className="flex flex-col h-full m-0 p-0">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
            >
              <div className="flex items-center justify-center h-full relative uppercase font-semibold text-white text-[4vh]">
                {item.text}
              </div>
            </div>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItemWithGSAP key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

// ✅ Add: Separate component for static rendering
const MenuItemStatic: React.FC<MenuItemProps> = ({ link, text }) => {
  return (
    <div className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]">
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh]"
        href={link}
      >
        {text}
      </a>
    </div>
  );
};

// ✅ Add: Wrapper component that conditionally uses GSAP
const MenuItemWithGSAP: React.FC<MenuItemProps> = (props) => {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [gsapInstance, setGsapInstance] = useState<any>(null);

  useEffect(() => {
    // ✅ Dynamically import GSAP
    const loadGsap = async () => {
      try {
        const gsapModule = await import('gsap');
        setGsapInstance(gsapModule.gsap);
        setGsapLoaded(true);
      } catch (error) {
        console.error("Error loading GSAP:", error);
      }
    };
    
    loadGsap();
  }, []);

  if (!gsapLoaded || !gsapInstance) {
    return <MenuItemStatic {...props} />;
  }

  return <MenuItem {...props} gsap={gsapInstance} />;
};

// ✅ Update: Pass GSAP as prop
interface MenuItemWithGSAPProps extends MenuItemProps {
  gsap: any;
}

const MenuItem: React.FC<MenuItemWithGSAPProps> = ({ link, text, image, gsap }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<any | null>(null); // ✅ Add: Reference for cleanup

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist =
      Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
      
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    // ✅ Update: Use gsap from props and store timeline reference
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    timelineRef.current = tl;
    
    tl.set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
      
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    // ✅ Update: Use gsap from props and store timeline reference
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    
    const tl = gsap.timeline({ defaults: animationDefaults });
    timelineRef.current = tl;
    
    tl.to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" })
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" });
  };

  // ✅ Add: Cleanup GSAP animations on unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const repeatedMarqueeContent = React.useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className="text-[#060606] uppercase font-normal text-[4vh] leading-[1.2] p-[1vh_1vw_0]">
          {text}
        </span>
        <div
          className="w-[200px] h-[7vh] my-[2em] mx-[2vw] p-[1em_0] rounded-[50px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#fff]"
      ref={itemRef}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-white text-[4vh] hover:text-[#060606] focus:text-white focus-visible:text-[#060606]"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="h-full w-[200%] flex" ref={marqueeInnerRef}>
          <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Add: Export with dynamic import
export default dynamic(() => Promise.resolve(FlowingMenuComponent), {
  ssr: false
});