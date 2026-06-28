"use client";
import Image from "next/image";
import React, { useState } from "react";
import doctor from "@/assets/images/Dr. Ahmed.png";
import {
  IoLocationOutline,
  IoStarHalfSharp,
  IoStarSharp,
} from "react-icons/io5";
import { Button } from "@/components/ui/button";

import CreateCaseForm from "@/app/[locale]/(patient)/patient/create-case/createCaseForm/CreateCaseForm";
import PageHeader from "@/app/_components/PageHeader";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { dynamicApiAction } from "../../patient.actions";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export default function Page() {
  const t = useTranslations("DoctorInsights");
  const g = useTranslations("governorates");
  const { id: studentId } = useParams();
  const [isLoading, setisLoading] = useState(false)

  async function handleSendRequestToDoctor() {
    const cId = Cookies.get("caseId");
    // console.log("studentId : ", studentId);
    // console.log("caseId : ", cId);
    const fullId = studentId + '/' + cId
    // console.log("fullId : ", fullId);
      setisLoading(true)
      const response =  await dynamicApiAction('TreatmentRequests/patient/send' ,'POST' ,fullId ,'')
      setisLoading(false)
      if (response.success){
        toast.success('Your Request Is Sent Successfully')
      }else{
        toast.error(String(response.error))
      }
      // console.log('response : ' , response

      // );
      
  }

  return (
    <section className="bg-[#F3F4FF]">
      <div className="container p-4 mx-auto space-y-4 ">
        <PageHeader title={t("pageTitle")} desc={t("pageDesc")} />
        <div className="space-y-10">
          <div className="flex flex-col sm:flex-row rounded-lg bg-white overflow-hidden shadow-[0px_1px_2px_0px_#000000/10]">
            <div className=" sm:w-80 aspect-square relative overflow-hidden">
              <Image fill src={doctor} alt="doctor ahmed"></Image>
            </div>
            <div className="p-6 sm:p-10 flex-1">
              <div className="space-y-4 pb-8">
                <div className="flex flex-col sm:flex-row gap-3 justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-2 items-center text-success text-xs font-semibold leading-4">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      {t("statusOnline")}
                    </div>
                    {/* داتا API */}
                    <h3 className="text-[#1B1C1D] font-heading text-3xl sm:text-5xl leading-15">
                      Dr. Ahmed
                    </h3>
                    <p className="text-[#094CB2] italic text-xl leading-7">
                      Senior Orthodontist
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-1 items-center text-[#6D5E00] text-2xl">
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarSharp />
                      <IoStarHalfSharp />
                      <IoStarHalfSharp />
                    </div>
                    <span className=" text-text-muted text-xs leading-4">
                      5.0 {t("ratingText")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 text-[#434653] text-sm leading-5 items-center">
                  <IoLocationOutline />
                  {/* بنستخدم g مع الـ key اللي جاي من الداتا */}
                  <span>{g("beni_suef")}, Egypt</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                onClick={handleSendRequestToDoctor}
                className=" w-full sm:w-fit rounded-xl shadow-[0px_10px_15px_-3px_#E8EBF2,0px_4px_6px_-4px_#E8EBF2] h-auto py-4 px-10 bg-primary text-white cursor-pointer hover:bg-primary-hover transition-colors">
                  { isLoading ? t('requestBtn_loading') :  t("requestBtn")}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-12 gap-6 sm:gap-8">
            <div className="col-span-12 sm:col-span-7 pb-8.5">
              <section className="space-y-6 p-10 bg-[#F5F3F4] ">
                <h4 className="text-[#1B1C1D] font-heading text-3xl leading-9">
                  {t("aboutTitle")} Ahmed
                </h4>
                {/* النص ده داتا API سبته زي ما هو */}
                <div className="text-text-body text-lg">
                  Dr. Ahmed is a dedicated dental professional and current
                  student at Beni-Seuf University. With a passion for advancing
                  dental techniques and patient comfort, he has focused his
                  career on orthodontics and restorative dentistry...
                </div>
              </section>
            </div>
            <div className="col-span-12 sm:col-span-5 space-y-6">
              <h4 className="text-[#1B1C1D] font-heading text-3xl leading-9">
                {t("reviewsTitle")}
              </h4>
              <div className="space-y-6">
                <div className="space-y-4 p-6 rounded-lg bg-white border border-[#C3C6D5] shadow-[0px_1px_2px_0px_black/5]">
                  <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-[#F9E37A] flex justify-center items-center rounded-lg text-[#211B00]">
                        A
                      </div>
                      <div>
                        <p className="text-sm leading-5 font-semibold text-[#1B1C1D]">
                          Ahmed M
                        </p>
                        <p className="text-[10px] leading-3.75 text-text-muted ">
                          {t("verifiedPatient")}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* نص التقييم داتا API */}
                  <p className="leading-6.5 text-text-muted italic">
                    &quot;This is a perfect doctor, he is so kind. The procedure
                    was painless and the results are amazing.&quot;
                  </p>
                </div>
              </div>
              <Button
                className="flex items-center justify-around h-auto bg-transparent text-xs leading-4 font-semibold text-[#094CB2] p-0 py-3 mx-auto"
              >
                {t("viewAllReviews")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
