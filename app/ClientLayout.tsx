'use client';

import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render a loading state until client-side hydration completes
  if (!isMounted) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">Loading Portfolio...</h2>
          <p className="mt-2 text-gray-400">Muhammad Ibrahim Musyaffa</p>
        </div>
      </div>
    );
  }

  return <LanguageProvider>{children}</LanguageProvider>;
}