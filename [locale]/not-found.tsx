"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-bg-main p-6 text-center">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        
        {/* Visual Metaphor: Animated Tooth Box */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border-light bg-white shadow-sm">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-5xl select-none"
          >
            🦷
          </motion.div>

          {/* علامة الاستفهام الحائرة */}
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-2xl font-bold text-danger"
          >
            ?
          </motion.span>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-1.5">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-2xl font-bold tracking-tight text-text-title"
          >
            {t("title")}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-body text-sm font-medium leading-relaxed text-text-muted"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full"
        >
          <Link href="/" passHref className="w-full">
            <Button className="w-full rounded-xl bg-primary py-6 font-heading font-bold text-white transition-colors duration-200 hover:bg-primary-hover shadow-sm">
              {t("backHomeBtn")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}