"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NoAppointments() {
  const t = useTranslations("noAppointments");

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6 text-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-border-light bg-white p-6 shadow-md">
        
        {/* Visual Metaphor: Animated Sad/Confused Tooth emoji Box */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border-light bg-primary-subtle shadow-inner">
          <motion.div
            animate={{
              y: [0, -4, 0],
              rotate: [0, -3, 3, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-5xl select-none"
          >
            🦷
          </motion.div>

          {/* علامة التعجب الحائرة */}
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute -top-2 -right-2 text-2xl font-bold text-warning"
          >
            !
          </motion.span>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-xl font-bold tracking-tight text-text-title">
            {t("title")}
          </h1>
          
          <p className="font-body text-sm font-medium leading-relaxed text-text-muted">
            {t("description")}
          </p>
        </div>

        {/* Action Button: HCI - Clear guidance */}
        <div className="w-full">
          <Link href="/" passHref className="w-full">
            <Button className="w-full rounded-xl bg-primary py-6 font-heading font-bold text-white transition-colors duration-200 hover:bg-primary-hover shadow-sm">
              {t("backDashboardBtn")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}