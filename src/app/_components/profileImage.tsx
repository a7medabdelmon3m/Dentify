"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import userImg from "@/assets/images/user.png";
import { FaCamera, FaStar } from "react-icons/fa6";
import { useTranslations } from "next-intl";

interface ProfileImageProps {
  userName: string;
  role: string;
  rating?: number; // ضفنا التقييم كـ Prop اختياري للطالب
}

export default function ProfileImage({ userName, role, rating = 4.5 }: ProfileImageProps) {
  const t = useTranslations("profile");
  const [image, setImage] = useState(userImg.src);
  const imgPrev = useRef(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const urlPreview = URL.createObjectURL(file);
      setImage(urlPreview);
    }
  }

  const isStudent = role === "Student";

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-3xl border border-primary/10 h-full">
      <div className="relative group">
        <div className="relative overflow-hidden rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-md transition-transform group-hover:scale-105 duration-300">
          <Image src={image} alt="Profile" className="object-cover" fill />
        </div>

        <label
          htmlFor="upload-photo"
          className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-primary hover:text-white transition-colors border border-border-light text-text-muted"
        >
          <FaCamera className="w-5 h-5" />
          <Input
            onChange={handleImageChange}
            ref={imgPrev}
            type="file"
            id="upload-photo"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      <h2 className="mt-5 text-2xl font-bold text-text-title text-center font-heading">
        {userName}
      </h2>
      <p className="mt-1 font-bold text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
        {t(`basic_info.${role}`)}
      </p>

      {/* إظهار التقييم لو اليوزر طالب فقط */}
      {isStudent && (
        <div className="flex items-center gap-1 mt-3 bg-white px-3 py-1.5 rounded-xl border border-border-light shadow-sm">
          <FaStar className="w-4 h-4 text-warning" />
          <span className="text-sm font-bold text-text-title">{rating} / 5.0</span>
        </div>
      )}
    </div>
  );
}