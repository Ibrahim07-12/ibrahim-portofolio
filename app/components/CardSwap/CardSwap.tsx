'use client'
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState, // ✅ Add: Import useState
} from "react";
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic

// ✅ Remove: Don't import GSAP at the module level
// import gsap from "gsap";

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
  className?: string;
  position?: 'left' | 'right';
  translateX?: string;  // Add new prop
  translateY?: string;  // Add new prop
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

type CardRef = RefObject<HTMLDivElement>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number,
  position: 'left' | 'right'
): Slot => ({
  // Sesuaikan nilai x untuk posisi right
  x: position === 'right' ? i * distX : i * distX,  // Hapus tanda negatif
  y: -i * distY,
  // Sesuaikan nilai z untuk depth effect
  z: position === 'right' ? -i * distX : -i * distX * 1.5,
  zIndex: total - i,
});

// ✅ Renamed component for dynamic export
const CardSwapComponent: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
  className = '',
  position = 'right',
  translateX = '5%',
  translateY = '20%',
}) => {
  // ✅ Add: Client-side detection
  const [isMounted, setIsMounted] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [gsapInstance, setGsapInstance] = useState<any>(null);

  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );
  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    [childArr]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );

  const tlRef = useRef<any | null>(null);
  const intervalRef = useRef<number>();
  const container = useRef<HTMLDivElement>(null);

  // ✅ Add: Load GSAP only in browser
  useEffect(() => {
    setIsMounted(true);
    
    // Dynamically import GSAP
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

  // ✅ Move GSAP function inside useEffect
  useEffect(() => {
    if (!isMounted || !gsapLoaded || !gsapInstance) return;
    
    // Function to set element position
    const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
      gsapInstance.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
      });
    
    const total = refs.length;
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total, position),
          position === 'right' ? -skewAmount : skewAmount
        );
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      if (!elFront) return;
      
      const tl = gsapInstance.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        if (!el) return;
        
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length, position);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length,
        position
      );
      
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsapInstance.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    
    // ✅ Safe setInterval usage
    if (typeof window !== 'undefined') {
      intervalRef.current = window.setInterval(swap, delay);
    }

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        if (tlRef.current) tlRef.current.pause();
        if (intervalRef.current && typeof window !== 'undefined') {
          window.clearInterval(intervalRef.current);
        }
      };
      const resume = () => {
        if (tlRef.current) tlRef.current.play();
        if (typeof window !== 'undefined') {
          intervalRef.current = window.setInterval(swap, delay);
        }
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current && typeof window !== 'undefined') {
          window.clearInterval(intervalRef.current);
        }
      };
    }
    
    return () => {
      if (intervalRef.current && typeof window !== 'undefined') {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [
    isMounted, 
    gsapLoaded, 
    gsapInstance, 
    cardDistance, 
    verticalDistance, 
    delay, 
    pauseOnHover, 
    skewAmount, 
    easing, 
    position, 
    refs, 
    config
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  // ✅ Add: Static placeholder for SSG/SSR
  if (!isMounted) {
    return (
      <div
        className={`
          relative
          ${position === 'right' ? 'right-0' : 'left-0'}
          transform 
          ${position === 'right' ? 'translate-x-[30%]' : '-translate-x-[5%]'}  
          translate-y-[20%] 
          origin-bottom-${position} 
          perspective-[900px] 
          overflow-visible 
          ${className}
        `}
        style={{ width, height }}
      >
        {/* Static cards for SSG */}
        {childArr.map((child, i) => (
          <div
            key={i}
            className={`
              absolute top-1/2 left-1/2 rounded-xl border border-white bg-black
              transform translate-x-[-50%] translate-y-[-50%] 
              ${i === 0 ? 'z-10' : `z-${10-i}`} 
              ${position === 'right' ? `translate-x-[${i*10}px]` : `translate-x-[${-i*10}px]`}
              translate-y-[${-i*10}px]
            `}
            style={{ 
              width, 
              height, 
              transform: `translate(-50%, -50%) translateX(${i * (cardDistance/2)}px) translateY(${-i * (verticalDistance/2)}px)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={container}
      className={`
        relative
        ${position === 'right' ? 'right-0' : 'left-0'}
        transform 
        ${position === 'right' ? 'translate-x-[30%]' : '-translate-x-[5%]'}  
        translate-y-[20%] 
        origin-bottom-${position} 
        perspective-[900px] 
        overflow-visible 
        ${className}
      `}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
}; 

// ✅ Add: Export with dynamic import
export default dynamic(() => Promise.resolve(CardSwapComponent), { ssr: false });