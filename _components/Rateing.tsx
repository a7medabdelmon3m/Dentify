"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Star, X, FastForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // نداء الـ Hook

export default function Rating() {
  const t = useTranslations("Rating");
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("Feedback Submitted:", { rating, feedback });
  };

  const handleSkip = () => {
    console.log("User skipped the rating");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent border border-success text-success hover:bg-success hover:text-white">
          {t("triggerButton")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] p-6 rounded-3xl bg-white border-0 shadow-2xl">
        <DialogHeader className="text-center sm:text-center space-y-2">
          <DialogTitle className="text-2xl font-bold text-[#1e293b]">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-[#64748b] text-base">
            {t("description")}
          </DialogDescription>
        </DialogHeader>

        {/* منطقة تقييم النجوم */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              type="button"
              variant="ghost" // ضفت دي عشان نشيل الـ default styling بتاع الزرار
              className="p-0 h-auto focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                size={36}
                className={`${
                  star <= (hover || rating)
                    ? "fill-[#FACC15] text-[#FACC15]"
                    : "fill-transparent text-gray-300"
                } transition-colors duration-200`}
              />
            </Button>
          ))}
          <span className="ml-3 text-sm text-gray-500 font-medium min-w-[70px]">
             {rating}/5 {t("stars")}
          </span>
        </div>

        {/* مساحة كتابة التعليق */}
        <div className="flex flex-col gap-2 mb-6">
          <label
            htmlFor="feedback"
            className="text-sm text-gray-500 font-medium text-start"
          >
            {t("feedbackLabel")}
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full min-h-[120px] p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent resize-none text-gray-700 placeholder:text-gray-400"
            placeholder={t("feedbackPlaceholder")}
          />
        </div>

        {/* زرار الإرسال */}
        <DialogClose asChild>
          <Button
            onClick={handleSubmit}
            className="w-full h-auto bg-[#8B5CF6] hover:bg-[#7C3AED] transition-colors text-white py-4 rounded-xl text-base font-semibold shadow-sm"
          >
            {t("submitButton")}
          </Button>
        </DialogClose>

        {/* الفاصل (OR) */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">
            {t("or")}
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* زراير الإلغاء والتخطي */}
        <div className="flex gap-4">
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="w-full h-auto flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-red-200 text-red-600 bg-white hover:bg-red-50 hover:text-red-700 transition-colors font-semibold"
            >
              <X className="w-5 h-5 text-red-500" />
              {t("cancelButton")}
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full h-auto flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-slate-200 text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-800 transition-colors font-semibold"
            >
              <FastForward className="w-5 h-5 text-slate-500" />
              {t("skipButton")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}