"use client";
import { useState, useEffect } from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';
import { motion } from 'framer-motion';
import Image from 'next/image'; // ✅ Add: Use Next.js Image component
import dynamic from 'next/dynamic'; // ✅ Add: Import dynamic

interface LanguageToggleProps {
  className?: string;
}

// ✅ Rename: Component for dynamic export
const LanguageToggleComponent: React.FC<LanguageToggleProps> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Update: Provide static placeholder during SSG/SSR
  if (!isMounted) {
    return (
      <div
        className={`relative flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 ${className}`}
        style={{ opacity: 0 }} // Start invisible to prevent flash
      >
        <div className="relative flex items-center gap-2 px-2 py-1 z-10">
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <div className="h-4 w-px bg-white/30" />
          <div className="w-6 h-6 rounded-full bg-gray-200" />
          <span className="text-xs font-medium text-white ml-1 opacity-0">
            EN
          </span>
        </div>
      </div>
    );
  }

  // ✅ Add: Error handling for context
  if (typeof language === 'undefined' || !setLanguage) {
    console.error("LanguageToggle: Language context not available");
    return null;
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  return (
    <motion.button
      className={`relative flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all duration-300 overflow-hidden ${className}`}
      onClick={toggleLanguage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
        animate={{ 
          opacity: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Flag images - moved to the left side */}
      <div className="relative flex items-center gap-2 px-2 py-1 z-10">
        <motion.div
          className="relative w-6 h-6 rounded-full overflow-hidden"
          animate={{
            opacity: language === 'en' ? 1 : 0.5,
            scale: language === 'en' ? 1.1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* ✅ Update: Replace img with Next.js Image component */}
          <Image
            src="/images/flags/uk-fleg.png"
            alt="English"
            fill
            sizes="24px"
            className="object-cover"
          />
        </motion.div>

        <div className="h-4 w-px bg-white/30" />

        <motion.div
          className="relative w-6 h-6 rounded-full overflow-hidden"
          animate={{
            opacity: language === 'id' ? 1 : 0.5,
            scale: language === 'id' ? 1.1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* ✅ Update: Replace img with Next.js Image component */}
          <Image
            src="/images/flags/id-fleg.png"
            alt="Indonesian"
            fill
            sizes="24px"
            className="object-cover"
          />
        </motion.div>
        
        <motion.span 
          className="text-xs font-medium text-white ml-1"
          animate={{
            opacity: 1
          }}
        >
          {language.toUpperCase()}
        </motion.span>
      </div>
    </motion.button>
  );
};

// ✅ Add: Export with dynamic import
export default dynamic(() => Promise.resolve(LanguageToggleComponent), {
  ssr: false
});