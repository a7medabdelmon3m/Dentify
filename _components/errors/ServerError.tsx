"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ServerError() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="flex min-h-[70vh] items-center justify-center px-4"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border-light bg-bg-card p-8 shadow-xl">
        
        {/* Background Glow */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-danger/10 blur-3xl" />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: [0, -8, 8, -8, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="mb-6 flex justify-center"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
            <ShieldAlert className="h-10 w-10 text-danger" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-text-title">
            Server Error
          </h1>

          <p className="mt-3 font-body text-base leading-relaxed text-text-muted">
            Something went wrong while loading the dental data.
            Please try again in a few moments.
          </p>

          {/* Actions */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-primary px-6 py-5 text-white transition-all hover:bg-primary-hover"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}