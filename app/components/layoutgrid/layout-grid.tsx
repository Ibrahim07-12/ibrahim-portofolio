"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [imageModal, setImageModal] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  const handleImageClick = (e: React.MouseEvent, card: Card) => {
    e.stopPropagation();
    setImageModal(card);
  };

  const closeImageModal = () => {
    setImageModal(null);
  };

  return (
    // Remove padding and max-width constraints from the outer container
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-1 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden backdrop-blur-md border border-white/20",
              selected?.id === card.id
                ? "rounded-xl cursor-pointer absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col shadow-2xl"
                : lastSelected?.id === card.id
                ? "z-40 bg-slate-800/80 rounded-xl h-full w-full shadow-lg"
                : "bg-slate-800/60 rounded-xl h-full w-full shadow-lg hover:shadow-xl transition-all duration-300"
            )}
            layoutId={`card-${card.id}`}
            whileHover={{ 
              scale: selected?.id === card.id ? 1 : 1.02,
              transition: { duration: 0.2 }
            }}
            style={{
              background: selected?.id === card.id 
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} onImageClick={handleImageClick} />
          </motion.div>
        </div>
      ))}
      
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-slate-900 opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.5 : 0 }}
      />

      {/* Image Modal with styling */}
      {imageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeImageModal}
          className="fixed inset-0 bg-slate-900 bg-opacity-95 z-[100] flex items-center justify-center p-8 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[50vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-sm bg-slate-800/20">
              <img
                src={imageModal.thumbnail}
                alt="Full size image"
                className="w-full h-auto max-h-full object-contain rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
            </div>
            <button
              onClick={closeImageModal}
              className="absolute -top-4 -right-4 text-white bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const ImageComponent = ({ 
  card, 
  onImageClick 
}: { 
  card: Card; 
  onImageClick: (e: React.MouseEvent, card: Card) => void;
}) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition-all duration-300 cursor-zoom-in hover:scale-110"
      )}
      alt="thumbnail"
      onClick={(e) => onImageClick(e, card)}
      style={{
        filter: 'brightness(0.9) contrast(1.1)',
      }}
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-xl shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.7,
        }}
        className="absolute inset-0 h-full w-full bg-gradient-to-t from-slate-900 via-slate-800/50 to-transparent opacity-70 z-10 rounded-xl"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        className="relative px-8 pb-6 z-[70] text-white drop-shadow-lg"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};