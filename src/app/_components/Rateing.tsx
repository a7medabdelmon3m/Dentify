"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, AlertCircle, CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { format, isValid } from "date-fns";
import { ar, enUS } from "date-fns/locale";

import defaultDoctorImg from "@/assets/images/Dr. Ahmed.png";
import { dynamicApiAction } from "../[locale]/(patient)/patient/patient.actions";
import { toast } from "react-toastify";

interface RatingProps {
  studentName?: string;
  studentImage?: StaticImageData;
  specialty?: string;
  appointmentDate?: string;
  requestId: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  onBack: () => void; 
}

export default function Rating({
  studentName = "أحمد منعم",
  studentImage = defaultDoctorImg,
  specialty,
  appointmentDate,
  requestId,
  isOpen,
  setIsOpen,
  onBack
}: RatingProps) {
  const t = useTranslations("Rating");
  const locale = useTranslations("locale").toString();
  
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showError, setShowError] = useState(false);

  const formatAppointmentDateTime = (isoDate?: string) => {
    if (!isoDate) return null;
    const dateObj = new Date(isoDate);
    if (!isValid(dateObj)) return null;
    const localeFns = locale === "ar" ? ar : enUS;
    return {
      fullDate: format(dateObj, "PPPP", { locale: localeFns }),
      time: format(dateObj, "p", { locale: localeFns }),
    };
  };

  const formattedDateTime = formatAppointmentDateTime(appointmentDate);
const [isLoading, setIsLoading] = useState(false); // ضفنا اللودينج عشان الزراير

  const handleSubmit = async () => {
    if (rating === 0) {
      setShowError(true);
      return;
    }

    setIsLoading(true); // تشغيل اللودينج

    try {
      // 1. أولاً: نبعت تأكيد الجلسة للباك إند
      const verifyResponse = await dynamicApiAction('Cases/verify-session', 'POST', requestId, { status: "Confirmed" });
      
      if (!verifyResponse.success) {
        toast.error("حدث خطأ أثناء تأكيد الجلسة، حاول مرة أخرى.");
        setIsLoading(false);
        return; // بنوقف هنا لو التأكيد فشل
      }

      // 2. ثانياً: نبعت التقييم بما إن التأكيد نجح
      const ratingPayload = {
        treatmentRequestId: parseInt(requestId),
        ratingValue: rating,
        comment: feedback
      };

      const ratingResponse = await dynamicApiAction('Rating', 'POST', undefined, ratingPayload);

      if (ratingResponse.success) {
        toast.success("تم تأكيد الجلسة وإرسال تقييمك بنجاح!");
        setIsOpen(false);
        setRating(0);
        setFeedback("");
        setShowError(false);
      } else {
        toast.error(ratingResponse.error?.toString() || "حدث خطأ أثناء إرسال التقييم");
      }
    } catch (error) {
      toast.error("حدث خطأ في الاتصال بالخادم.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const , stiffness: 300 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl bg-white border-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)] [&>button]:hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="p-6 md:p-8"
        >
          <motion.div variants={itemVariants}>
            <DialogHeader className="text-center sm:text-center space-y-2 mb-6">
              <DialogTitle className="text-2xl font-bold text-[#1e293b]">
                {t("title")}
              </DialogTitle>
              <DialogDescription className="text-[#64748b] text-sm md:text-base">
                {t("description")}
              </DialogDescription>
            </DialogHeader>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#F8FAFC] border border-slate-100 rounded-2xl mb-6 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center gap-4 border-b border-slate-100/60 bg-white">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
                <Image src={studentImage} alt={studentName} fill className="object-cover" sizes="48px" />
              </div>
              <div className="text-start">
                <h4 className="text-[#1e293b] font-bold text-base leading-tight">د. {studentName}</h4>
                <p className="text-[#64748b] text-xs font-medium mt-0.5">{specialty || t("studentRole")}</p>
              </div>
            </div>
            
            {formattedDateTime && (
              <div className="p-3 px-4 flex items-start gap-3 bg-slate-50/50">
                <CalendarClock className="w-5 h-5 text-primary mt-0.5" />
                <div className="text-start space-y-0.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {t("appointmentDateLabel")}
                  </p>
                  <p className="text-sm font-semibold text-slate-700">
                    {formattedDateTime.fullDate} <span className="mx-1 text-slate-400">•</span> <span className="text-primary font-bold">{formattedDateTime.time}</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-1.5 md:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-1 focus:outline-none"
                  onClick={() => {
                    setRating(star);
                    setShowError(false); 
                  }}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={40}
                    className={`${
                      star <= (hover || rating)
                        ? "fill-[#FACC15] text-[#FACC15] drop-shadow-md scale-110"
                        : "fill-slate-100 text-slate-300"
                    } transition-all duration-200`}
                  />
                </motion.button>
              ))}
            </div>
            
            {showError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="flex items-center gap-2 mt-4 text-danger bg-danger/10 px-4 py-2 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold">{t("ratingRequired")}</span>
              </motion.div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-6">
            <label htmlFor="feedback" className="text-sm text-slate-500 font-bold text-start px-1">
              {t("feedbackLabel")}
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-slate-700 placeholder:text-slate-400 text-sm md:text-base shadow-inner"
              placeholder={t("feedbackPlaceholder")}
            />
          </motion.div>

          {/* ── الأزرار (إرسال وتراجع) ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <Button
              onClick={handleSubmit}
              className="w-full h-14 bg-primary hover:bg-primary-hover transition-colors text-white rounded-xl text-base font-bold shadow-lg shadow-primary/25"
            >
              {t("submitButton")}
            </Button>
            
            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full h-12 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              {t("backButton")}
            </Button>
          </motion.div>

        </motion.div>
      </DialogContent>
    </Dialog>
  );
}