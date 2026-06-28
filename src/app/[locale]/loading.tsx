"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4">
        
        {/* Dental/Tooth Inspired Framer Motion Animation */}
        <div className="relative flex items-center justify-center w-24 h-24">
          
          {/* Animated Glowing Background Rings */}
          <motion.div
            className="absolute inset-0 border-2 border-primary/30 rounded-2xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              borderRadius: ["24px", "40px", "24px"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div
            className="absolute inset-2 border border-dashed border-primary/60 rounded-xl"
            animate={{
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center Tooth Icon / Graphic Symbol using SVG */}
          <motion.div
            animate={{
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-primary z-10"
          >
            {/* Minimalist Professional Tooth SVG Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10"
            >
              <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1 5.5 2 7 1 1.5 1.5 3 1.5 5 0 1 .5 1.5 1.5 1.5.7 0 1.2-.3 1.5-.8.3.5.8.8 1.5.8 1 0 1.5-.5 1.5-1.5 0-2 .5-3.5 1.5-5 1-1.5 2-3.5 2-7 0-3.5-2.5-6-6-6z" />
              <path d="M12 2v4" />
              <path d="M9 7.5c1 .5 2 .5 3 0" />
            </svg>
          </motion.div>
        </div>

        {/* Brand Name Text Animation */}
        <motion.h3
          className="font-heading font-bold text-2xl text-text-title tracking-wider pt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Dentify
        </motion.h3>
        
      </div>
    </div>
  );
}