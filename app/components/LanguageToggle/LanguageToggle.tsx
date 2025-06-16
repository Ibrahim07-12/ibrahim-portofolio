"use client";
import { useState, useEffect } from 'react';
import { useLanguage, Language } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = "" }) => {
  const { language, setLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
        <motion.img
          src="./images/flags/uk-fleg.png"
          className="w-6 h-6 rounded-full object-cover"
          animate={{
            opacity: language === 'en' ? 1 : 0.5,
            scale: language === 'en' ? 1.1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="h-4 w-px bg-white/30" />

        <motion.img
          src="./images/flags/id-fleg.png"
          className="w-6 h-6 rounded-full object-cover"
          animate={{
            opacity: language === 'id' ? 1 : 0.5,
            scale: language === 'id' ? 1.1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        />
        
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

export default LanguageToggle;