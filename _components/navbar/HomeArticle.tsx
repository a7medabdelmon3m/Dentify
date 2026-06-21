import Image from "next/image";
import React, { ReactNode } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
export type prop = {
    img:string;
    article:string;
    title:string;
    titleIcon:ReactNode
    imageFirst?:boolean
}
export default function HomeArticle({img ,title,titleIcon,article ,imageFirst =true}:prop) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className={`flex justify-center md:justify-start ${imageFirst ?'md:order-first':'md:order-last'}`}>
        <Image
          src={img}
          alt={title}
          width={497}
          height={491}
          className="rounded-[50px] object-cover w-full max-w-124.5 h-auto"
        />
      </div>

      <div className="text-center md:text-start space-y-6">
        <h2 className="text-3xl md:text-[40px] font-semibold text-black uppercase flex gap-3 items-center">
          {title}
          {titleIcon}
        </h2>
        <p className="text-lg md:text-[24px] font-normal text-text-black leading-relaxed">
          {article}
        </p>
      </div>
    </div>
  );
}
