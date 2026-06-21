// import React from "react";
// export type prop = {
//     title:string;
//     desc:string;
// }
// export default function PageHeader({title ,desc}:prop) {
//   return (
//     <div>
//       <h2 className="font-bold font-heading text-text-title text-2xl">
//         {title}
//       </h2>
//       <p className="text-text-body font-medium text-sm">{desc}</p>
//       <hr className="border border-gray-200 my-6" />
//     </div>
//   );
// }
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";

export type prop = {
  title: string;
  desc: string;
  icon?: React.ReactNode;
};

export default function PageHeader({ title, desc, icon }: prop) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#D8DCE8] bg-white px-5 py-4 shadow-sm">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />

      <div className="flex items-start gap-3">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary shrink-0"
        >
          {icon || <Stethoscope size={22} />}
        </motion.div>

        <div className="flex-1">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-bold font-heading text-text-title text-xl md:text-2xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-text-body font-medium text-sm mt-1"
          >
            {desc}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="h-[2px] bg-gradient-to-r from-primary to-primary-hover mt-4 rounded-full"
      />
    </div>
  );
}