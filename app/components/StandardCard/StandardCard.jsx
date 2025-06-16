'use client';
import React from 'react';
import { motion } from 'framer-motion';
// Import OptimizedImage setelah Anda membuat file tersebut
import { OptimizedImage } from '../OptimizedImage/OptimizedImage';

export const CardVariants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  DARK: 'dark',
  LIGHT: 'light',
};

export const CardSizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

export default function StandardCard({
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  variant = CardVariants.PRIMARY,
  size = CardSizes.MEDIUM,
  className = '',
  clickable = false,
  onClick,
  children,
}) {
  // Card style variations based on variant prop
  const cardStyles = {
    [CardVariants.PRIMARY]: 'bg-gradient-to-br from-blue-900/80 to-indigo-900/80 border-blue-500/30',
    [CardVariants.SECONDARY]: 'bg-gradient-to-br from-purple-900/80 to-pink-900/80 border-purple-500/30',
    [CardVariants.DARK]: 'bg-gradient-to-br from-gray-900/90 to-black border-gray-700/50',
    [CardVariants.LIGHT]: 'bg-gradient-to-br from-gray-100/90 to-white border-gray-300/50 text-gray-800',
  };
  
  // Card size variations
  const sizeStyles = {
    [CardSizes.SMALL]: 'p-4 rounded-lg',
    [CardSizes.MEDIUM]: 'p-5 rounded-xl',
    [CardSizes.LARGE]: 'p-6 rounded-2xl',
  };
  
  // Title size variations based on card size
  const titleStyles = {
    [CardSizes.SMALL]: 'text-lg',
    [CardSizes.MEDIUM]: 'text-xl',
    [CardSizes.LARGE]: 'text-2xl',
  };

  return (
    <motion.div
      className={`backdrop-blur-xl border shadow-lg ${cardStyles[variant]} ${sizeStyles[size]} ${className} 
        ${clickable ? 'cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1' : ''}`}
      onClick={clickable ? onClick : undefined}
      whileHover={clickable ? { scale: 1.02 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Image container with consistent aspect ratio */}
      {imageSrc && (
        <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden">
          <OptimizedImage 
            src={imageSrc} 
            alt={imageAlt || title || "Card image"} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="space-y-3">
        {title && (
          <h3 className={`font-bold ${titleStyles[size]} ${variant === CardVariants.LIGHT ? 'text-gray-800' : 'text-white'}`}>
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className={`${variant === CardVariants.LIGHT ? 'text-gray-600' : 'text-gray-300'} text-sm font-medium`}>
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className={`${variant === CardVariants.LIGHT ? 'text-gray-600' : 'text-gray-300'} text-sm leading-relaxed`}>
            {description}
          </p>
        )}
        
        {children}
      </div>
    </motion.div>
  );
}