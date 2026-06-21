"use client";

import { motion } from "framer-motion";
import { AlertTriangle, } from "lucide-react";
type ErrorMessageProps = {
  title?: string;
  message?: string;
};

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't complete your request right now.",
}: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="flex w-full items-center justify-center px-4 py-10"
    >
      <div className="w-full max-w-md rounded-2xl border border-warning/20 bg-warning/5 p-6 shadow-sm">
        
        <div className="flex items-start gap-4">
          
          {/* Animated Icon */}
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-warning/10"
          >
            <AlertTriangle className="h-7 w-7 text-warning" />
          </motion.div>

          {/* Text */}
          <div>
            <h2 className="font-heading text-xl font-semibold text-text-title">
              {title}
            </h2>

            <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">
              {message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}