import Image from "next/image";
import React from "react";
import doctor from "@/assets/images/Dr. Ahmed.png";
import { IoStarHalfSharp, IoStarSharp } from "react-icons/io5";
import { FaPhone, FaUniversity } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import PageHeader from "@/app/_components/PageHeader";

export default function page() {
  return (
    <section className="bg-[#F3F4FF]">
      <div className="container p-4 mx-auto">
        <PageHeader title="Care Proposals" desc="Review clinical treatment plans and choose the best student to manage your case." />
        <div className="bg-white shadow-md rounded-xl p-6 max-w-3xl mx-auto">
          <div className="flex gap-4 justify-between items-start pb-8 border-b border-gray-100">
            <div className="flex gap-3 items-center">
              <div className="relative w-18 h-18  rounded-full overflow-hidden ring-4 ring-primary ring-offset-2">
                <Image
                  src={doctor}
                  alt="d.Ahmed"
                  fill
                  className="object-cover"
                ></Image>
              </div>
              <div className="space-y-1">
                <h4 className="font-heading text-text-title font-semibold text-xl">
                  Dr.Ahmed Moneim
                </h4>
                <div className="flex gap-1 items-center">
                  <div className="flex gap-1 items-center text-[#6D5E00] text-xl">
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarSharp />
                    <IoStarHalfSharp />
                    <IoStarHalfSharp />
                  </div>
                  <span>Rating(3.6)</span>
                </div>
                <p className="text-xs font-semibold text-sky-600">
                  Senior Orthodontist
                </p>
              </div>
            </div>
            <div className="flex gap-1 font-medium text-text-muted py-1 px-3 bg-gray-50 border border-gray-100 rounded-full  shadow-sm shadow-black/10">
              <span>Submited:</span>
              <span>2h ago</span>
            </div>
          </div>
          <div className="pt-6 space-y-2">
            <h4 className="font-heading font-semibold text-text-title">
              Doctor Details
            </h4>
            <div className="flex gap-4 ">
              <div className="flex gap-3 items-center border border-gray-200 py-1 px-4 bg-gray-50 rounded-full font-medium flex-1">
                <div className="flex w-8 h-8 rounded-full justify-center items-center bg-primary-subtle text-primary">
                  <FaPhone />
                </div>
                01234567891
              </div>
              <div className="flex gap-3 items-center border border-gray-200 py-1 px-4 bg-gray-50 rounded-full font-medium flex-1">
                <div className="flex w-8 h-8 rounded-full justify-center items-center bg-primary-subtle text-primary">
                  <FaUniversity />
                </div>
                Beni-suef University
              </div>
            </div>
          </div>
          <div className="space-y-3 pt-6">
            <h4 className="font-heading font-semibold text-text-title">
              Treatment Proposal
            </h4>
            <p className="">
              &quot;Hello! I have reviewed your case regarding tartar
              accumulation. I can provide a comprehensive professional scaling
              and polishing session at the university hospital. The plan
              includes: Full tartar removal using ultrasonic scalers. Teeth
              polishing to remove surface stains. A personalized oral hygiene
              guide for long-term care. The session will take approx. 60 minutes
              under full faculty supervision to ensure the best results. Looking
              forward to helping you!&quot;
            </p>
          </div>
          <div className="flex gap-4 items-center pt-8">
            <Button className="h-auto py-2 px-4 border-none flex flex-1 justify-center items-center rounded-lg text-lg text-white font-medium bg-success hover:bg-success/70 shadow-lg shadow-success/50 transition-colors">Accept Care</Button>
            <Button className="h-auto py-2 px-4 flex border-none flex-1 justify-center items-center rounded-lg text-lg text-white font-medium bg-danger hover:bg-danger/70 shadow-lg shadow-danger/50 transition-colors">Decline Care</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
