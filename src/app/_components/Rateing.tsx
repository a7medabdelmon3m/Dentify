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
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Star, X, FastForward, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// صورة تجريبية (استبدلها بالمسار الصحيح عندك)
import defaultDoctorImg from "@/assets/images/Dr. Ahmed.png";
import { dynamicApiAction } from "../[locale]/(patient)/patient/patient.actions";
import { toast } from "react-toastify";

// إعداد الـ Props عشان تستقبل بيانات الطالب الديناميكية
interface RatingProps {
  studentName?: string;
  studentImage?:StaticImageData;
  specialty?: string;
  requestId: string;
  isOpen:boolean;
  setIsOpen: (val: boolean) => void;
}

export default function Rating({
  studentName = "أحمد منعم", // قيم افتراضية
  studentImage = defaultDoctorImg,
  specialty,
  requestId,
  isOpen,
  setIsOpen
}: RatingProps) {
  const t = useTranslations("Rating");
  
  // التحكم في فتح وقفل الـ Modal يدوياً
  // const [open, setOpen] = useState(false);
  
  // التقييم المبدئي 0 عشان نجبره يقيم
  const [rating, setRating] = useState(0); 
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showError, setShowError] = useState(false); // State للتحذير

  const handleSubmit = async () => {
  // 1. التحقق من التقييم
  if (rating === 0) {
    setShowError(true);
    return;
  }

  // 2. استخراج الـ ID من الـ params (تمت بشكل صحيح)

  // 3. تجهيز الـ Body اللي الـ API مستنيه (تأكد من مطابقة أسماء الحقول لـ CreateRatingDTO)
  const ratingPayload = {
    treatmentRequestId: parseInt(requestId), // لازم نحوله لـ int
    ratingValue: rating,
    comment: feedback
  };
console.log('requestId : ' ,requestId);

  // 4. تنفيذ الـ API Call
  // ملاحظة: افترضنا إن اسم الـ Controller هو 'Rating'
  const response = await dynamicApiAction('Rating', 'POST', undefined, ratingPayload);

  // 5. التعامل مع النتيجة
  if (response.success) {
    toast.success("تم إرسال تقييمك بنجاح!");
    setIsOpen(false);
    setRating(0);
    setFeedback("");
    setShowError(false);
  } else {
    toast.error(response.error?.toString() || "حدث خطأ أثناء الإرسال");
  }
};

  const handleSkip = () => {
    console.log("User skipped the rating");
    setIsOpen(false);
  };

  // إعدادات الـ Framer Motion لظهور العناصر بشكل متدرج وسلس
  const containerVariants: Variants= {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const , stiffness: 300 } },
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <Button className="bg-transparent border border-success text-success hover:bg-success hover:text-white transition-all duration-300">
          {t("triggerButton")}
          
        </Button> */}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden rounded-3xl bg-white border-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
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

          {/* ── كارت بيانات الطالب ── */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 bg-[#F8FAFC] border border-slate-100 p-4 rounded-2xl mb-6 shadow-sm"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
              <Image
                src={studentImage}
                alt={studentName}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="text-start">
              <h4 className="text-[#1e293b] font-bold text-lg leading-tight">
                د. {studentName}
              </h4>
              <p className="text-[#64748b] text-xs font-medium mt-0.5">
                {specialty || t("studentRole")}
              </p>
            </div>
          </motion.div>

          {/* ── منطقة تقييم النجوم ── */}
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
                    setShowError(false); // إخفاء الإيرور بمجرد ما يختار
                  }}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={38}
                    className={`${
                      star <= (hover || rating)
                        ? "fill-[#FACC15] text-[#FACC15] drop-shadow-md"
                        : "fill-slate-100 text-slate-300"
                    } transition-all duration-200`}
                  />
                </motion.button>
              ))}
              <span className="ml-3 text-sm text-gray-400 font-bold min-w-[50px]">
                {rating}/5
              </span>
            </div>
            
            {/* ── رسالة التحذير لو داس إرسال بدون تقييم ── */}
            {showError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="flex items-center gap-2 mt-3 text-danger bg-danger/10 px-3 py-1.5 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-bold">{t("ratingRequired")}</span>
              </motion.div>
            )}
          </motion.div>

          {/* ── مساحة كتابة التعليق ── */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-6">
            <label
              htmlFor="feedback"
              className="text-sm text-slate-500 font-bold text-start"
            >
              {t("feedbackLabel")}
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6] transition-all resize-none text-slate-700 placeholder:text-slate-400 text-sm md:text-base shadow-inner"
              placeholder={t("feedbackPlaceholder")}
            />
          </motion.div>

          {/* ── زرار الإرسال (بدون DialogClose للتحكم اليدوي) ── */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleSubmit}
              className="w-full h-14 bg-primary hover:bg-primary-hover transition-colors text-white rounded-xl text-base font-bold shadow-lg shadow-primary/25"
            >
              {t("submitButton")}
            </Button>
          </motion.div>

          {/* ── الفاصل (OR) ── */}
          <motion.div variants={itemVariants} className="relative flex items-center py-5">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">
              {t("or")}
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </motion.div>

          {/* ── زراير الإلغاء والتخطي ── */}
          <motion.div variants={itemVariants} className="flex gap-3">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full h-12 flex-1 flex items-center justify-center gap-2 rounded-xl border-danger/20 text-danger bg-danger/5 hover:bg-danger hover:text-white transition-all font-bold"
              >
                <X className="w-4 h-4" />
                {t("cancelButton")}
              </Button>
            </DialogClose>

            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full h-12 flex-1 flex items-center justify-center gap-2 rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 transition-all font-bold"
            >
              <FastForward className="w-4 h-4" />
              {t("skipButton")}
            </Button>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}