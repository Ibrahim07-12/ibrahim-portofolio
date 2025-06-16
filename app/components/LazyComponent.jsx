import { Suspense, lazy, useState, useEffect } from 'react';

// Loader placeholder
const LoadingFallback = ({ height = "300px" }) => (
  <div 
    className="w-full rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse flex items-center justify-center" 
    style={{ height }}
  >
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Higher order component for lazy loading any component
export function createLazyComponent(importFunc, deps = [], loadingHeight = "300px") {
  const LazyComponent = lazy(importFunc);
  
  return function LazyLoadedComponent(props) {
    const [shouldLoad, setShouldLoad] = useState(false);
    
    useEffect(() => {
      // Load component when it's near viewport
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      }, { rootMargin: '200px' });
      
      const container = document.getElementById(`lazy-container-${props.id || 'default'}`);
      if (container) {
        observer.observe(container);
      }
      
      return () => observer.disconnect();
    }, [props.id, ...deps]);
    
    return (
      <div id={`lazy-container-${props.id || 'default'}`}>
        {shouldLoad ? (
          <Suspense fallback={<LoadingFallback height={loadingHeight} />}>
            <LazyComponent {...props} />
          </Suspense>
        ) : (
          <LoadingFallback height={loadingHeight} />
        )}
      </div>
    );
  };
}

// Contoh penggunaan (sesuaikan dengan komponen yang ada di aplikasi Anda)
// Uncomment dan sesuaikan dengan struktur proyek Anda
/*
export const LazyThreeDMarquee = createLazyComponent(
  () => import('./3Dmarquee/3d-marquee').then(mod => ({ default: mod.ThreeDMarquee })),
  [],
  "400px"
);

export const LazyGridDistortion = createLazyComponent(
  () => import('./GridDistortion/GridDistortion'),
  [],
  "600px"
);
*/