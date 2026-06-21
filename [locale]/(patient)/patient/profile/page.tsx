import ChangePassForm from "@/app/_components/changePasswoedForm/ChangePassForm";
import InfoForm from "@/app/_components/infoForm/InfoForm";
import PageHeader from "@/app/_components/PageHeader";
import ProfileImage from "@/app/_components/profileImage";
import { apiRequest } from "@/app/api/services/denti.services";
import { profileType } from "@/type";
import { getTranslations } from "next-intl/server";
import React from "react";
import { CgMail } from "react-icons/cg";
import { CiLock } from "react-icons/ci";
import { FaPen, FaPhone, FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { MdOutlineEdit } from "react-icons/md";

export default async function page() {
  const t = await getTranslations("profile");
  // استدعيت المحافظات هنا عشان لو هتعرض المحافظة المترجمة للمريض بدل الإنجليزي دايماً
  const g = await getTranslations("governorates");

  // هفترض إن دي الداتا اللي جاية من الـ API
  const userData = {
   
    cityKey: "beni_suef", // القيمة دي بنستخدمها في الـ object بتاع المحافظات
  }; 
  const profileDetails = await (await apiRequest<profileType>('http://localhost:5123/api/Account/profile')).data

  // console.log('profileDetails : ' , profileDetails );
  

  return (
    <section className="bg-[#F3F4FF] flex-1">
      <div className="container p-4  mx-auto space-y-4 ">
        <PageHeader
          title={t("profile_header.title")}
          desc={t("profile_header.description")}
        />

        <div className="container p-4  mx-auto max-w-5xl bg-white rounded-xl shadow-md ">
          <div className="space-y-4 p-3">
            <div className="rounded-lg shadow-sm space-y-3 p-3">
              <div className="flex gap-2 items-center font-semibold text-lg text-text-title">
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary-subtle text-lg text-primary">
                  <FaRegUser />
                </div>
                <p>{t("basic_info.title")}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className=" pr-3 border-b sm:border-e sm:border-b-0 border-gray-200">
                  <ProfileImage userName={profileDetails?.fullName as string} role={profileDetails?.role as string} />
                </div>
                <div className="flex flex-col gap-3 justify-between  flex-1">
                  <div className="flex gap-4 items-center border-b border-gray-200 pb-3">
                    <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-text-muted text-lg font-medium">
                      <IoLocationOutline />
                    </div>
                    <div className="flex flex-col sm:flex-row flex-1 justify-between items-start sm:items-center">
                      <h4 className="font-heading text-text-title font-semibold">
                        {t("basic_info.governorate_label")}
                      </h4>
                      <p className="text-md text-text-body font-light">
                        {g(userData.cityKey)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center border-b border-gray-200 pb-3">
                    <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-text-muted text-lg font-medium">
                      <LuPhone />
                    </div>
                    <div className="flex flex-col sm:flex-row flex-1 justify-between items-start sm:items">
                      <h4 className="font-heading text-text-title font-semibold">
                        {t("basic_info.phone_label")}
                      </h4>
                      <p className="text-md text-text-body font-light">
                        {profileDetails?.phoneNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center border-b border-gray-200 pb-3">
                    <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-text-muted text-lg font-medium">
                      <CgMail />
                    </div>
                    <div className="flex flex-col sm:flex-row flex-1 justify-between items-start sm:items">
                      <h4 className="font-heading text-text-title font-semibold">
                        {t("basic_info.email_label")}
                      </h4>
                      <p className="text-md text-text-body font-light">
                        {profileDetails?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center  border-gray-200 pb-3">
                    <div className="flex shrink-0 items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-text-muted text-lg font-medium">
                      <CgMail />
                    </div>
                    <div className="flex flex-col sm:flex-row flex-1 justify-between items-start sm:items">
                      <h4 className="font-heading text-text-title font-semibold">
                        {t("basic_info.role_label")}
                      </h4>
                      <p className="text-md text-text-body font-light">
                        {t(`basic_info.${profileDetails?.role}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" rounded-lg shadow-sm space-y-3 p-3">
              <div className="flex gap-2 items-center font-semibold text-lg text-text-title">
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary-subtle text-lg text-primary">
                  <CiLock />
                </div>
                <p>{t("security.title")}</p>
              </div>
              <ChangePassForm />
            </div>
            <div className=" rounded-lg shadow-sm space-y-3 p-3">
              <div className="flex gap-2 items-center font-semibold text-lg text-text-title">
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary-subtle text-lg text-primary">
                  <MdOutlineEdit />
                </div>
                <p>{t("basic_info.edit_title")}</p>
              </div>
              <InfoForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
