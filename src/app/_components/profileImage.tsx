"use client";
import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import user from "@/assets/images/user.png";
import { FaCamera } from "react-icons/fa";
import { useTranslations } from "next-intl";


export default function ProfileImage({userName ,role}:{userName:string ,role:string}) {
  const [image, setImage] = useState(user.src); // مسار الصورة الافتراضية
  const imgPrev = useRef(null);
 function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]; 
  if (file) {
    const urlPreview = URL.createObjectURL(file);
    setImage(urlPreview);
  }
}
  const t = useTranslations(`profile`)
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-full">
      <div className="relative  ">
        <div className="relative overflow-hidden  rounded-full w-42 h-42 border-4 border-white shadow-lg ">
          <Image
            src={image}
            alt="Profile"
            className=" object-cover "
            fill
          />
        </div>
        {/* صورة البروفايل */}

        {/* زرار رفع الصورة */}
        <label
          htmlFor="upload-photo"
          className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <FaCamera className="w-5 h-5 text-gray-600" />
          <Input
            onChange={handleImageChange}
            ref={imgPrev}
            type="file"
            id="upload-photo"
            className="hidden"
            accept="image/*"
            // onChange={(e) => handleImageUpload(e)}
          />
        </label>
      </div>

      {/* اسم المستخدم */}
      <p className="mt-4 text-2xl font-bold text-text-black">{userName} </p>
      <p className="font-medium text-lg text-success ">{t(`basic_info.${role}`)}</p>
    </div>
  );
}
