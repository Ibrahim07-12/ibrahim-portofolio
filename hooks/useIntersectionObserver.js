
import { useState, useEffect, useRef } from 'react';

export default function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when intersection status changes
        const isNowIntersecting = entry.isIntersecting;
        
        if (triggerOnce && isNowIntersecting && hasTriggered) {
          return; // Skip if we've already triggered once
        }
        
        setIsIntersecting(isNowIntersecting);
        
        if (triggerOnce && isNowIntersecting) {
          setHasTriggered(true);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return { ref, isIntersecting, hasTriggered };
}