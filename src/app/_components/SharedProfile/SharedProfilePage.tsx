import React from "react";
import { getTranslations } from "next-intl/server";
import { apiRequest } from "@/app/api/services/denti.services";
import { profileType } from "@/type";

import PageHeader from "@/app/_components/PageHeader";
import ProfileImage from "@/app/_components/profileImage";
import InfoForm from "@/app/_components/infoForm/InfoForm";
import ChangePassForm from "@/app/_components/changePasswoedForm/ChangePassForm";

import { FaUserDoctor, FaRegUser, FaShieldHalved } from "react-icons/fa6";
import { MapPin, Phone, Mail, GraduationCap, Star, MessageSquareQuote } from "lucide-react";

export type studentRatingType = {
  id: number;
  treatmentRequestId: number;
  studentName: string;
  patientName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const MOCK_PROFILE: profileType & { id?: number } = {
  id: 4, 
  fullName: "أحمد عبد المنعم محمد",
  email: "ahmed.moneim@example.com",
  phoneNumber: "01012345678",
  role: "Student",
  specializations: ['1']
};

export default async function ProfilePage() {
  const t = await getTranslations("profile");
  const g = await getTranslations("governorates");

  const userData = { cityKey: "beni_suef" };
  
  let profileDetails: profileType & { id?: number };

  try {
    const response = await apiRequest<profileType & { id?: number }>(
      "http://localhost:5123/api/Account/profile",
    );
    profileDetails = response?.data || MOCK_PROFILE;
  } catch (error) {
    console.warn("API Error, using Mock Data instead:", error);
    profileDetails = MOCK_PROFILE;
  }

  const role = profileDetails.role || "Patient";
  const isStudent = role === "Student";

  let ratingsList: studentRatingType[] = [];
  if (isStudent && profileDetails.id) {
    try {
      const ratingResponse = await apiRequest<studentRatingType[]>(
        `http://localhost:5123/api/Rating/student/${profileDetails.id}/average` 
      );
      ratingsList = ratingResponse?.data || [];
    } catch (error) {
      console.error("Failed to fetch ratings:", error);
    }
  }

  const averageRating = ratingsList.length > 0 
    ? ratingsList.reduce((acc, curr) => acc + curr.rating, 0) / ratingsList.length 
    : 0;

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <PageHeader
          title={t("profile_header.title")}
          desc={t("profile_header.description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-2">
              <ProfileImage
                userName={profileDetails.fullName}
                role={role}
                rating={averageRating} 
                
              />
            </div>

            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 space-y-4">
              <h3 className="font-heading font-bold text-lg text-text-title mb-4 border-b border-border-light pb-3">
                {t("basic_info.title")}
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold">{t("basic_info.governorate_label")}</p>
                  <p className="text-sm font-bold text-text-title">{g(userData.cityKey)}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold">{t("basic_info.phone_label")}</p>
                  <p className="text-sm font-bold text-text-title" dir="ltr">{profileDetails.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold">{t("basic_info.email_label")}</p>
                  <p className="text-sm font-bold text-text-title truncate">{profileDetails.email}</p>
                </div>
              </div>

              {isStudent && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-bold">{t("basic_info.university")}</p>
                    <p className="text-sm font-bold text-text-title">جامعة بني سويف</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-border-light pb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {isStudent ? <FaUserDoctor className="w-6 h-6" /> : <FaRegUser className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-text-title">{t("basic_info.edit_title")}</h2>
                  <p className="text-sm text-text-muted font-medium">{t("basic_info.edit_desc")}</p>
                </div>
              </div>
              <InfoForm role={role} defaultData={profileDetails} />
            </div>

            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-border-light pb-4">
                <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center text-danger">
                  <FaShieldHalved className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-text-title">{t("security.title")}</h2>
                  <p className="text-sm text-text-muted font-medium">{t("security.desc")}</p>
                </div>
              </div>
              <ChangePassForm />
            </div>

            {isStudent && (
              <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-border-light pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FACC15]/15 flex items-center justify-center text-[#eab308]">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-text-title">{t("reviews.title")}</h2>
                    <p className="text-sm text-text-muted font-medium">{t("reviews.description")}</p>
                  </div>
                </div>

                <div className="max-h-[400px] overflow-y-auto pr-2 pb-2 space-y-4">
                  {ratingsList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ratingsList.map((review) => (
                        <div 
                          key={review.id} 
                          className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                                <FaRegUser className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-text-title text-sm">{review.patientName || "مريض"}</h4>
                                <span className="text-xs text-text-muted">
                                  {new Date(review.createdAt).toLocaleDateString("ar-EG", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm shrink-0">
                              <Star className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                              <span className="font-bold text-sm text-text-title">{review.rating}</span>
                            </div>
                          </div>
                          
                          <div className="relative mt-auto">
                            <MessageSquareQuote className="w-6 h-6 text-slate-200 absolute rtl:left-0 ltr:right-0 -top-1 rtl:-scale-x-100" />
                            <p className="text-sm text-slate-600 leading-relaxed relative z-10 pt-2 rtl:pl-6 ltr:pr-6">
                              {review.comment || "لا يوجد تعليق"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center bg-[#F8FAFC] border border-dashed border-slate-200 rounded-2xl py-12">
                      <Star className="w-12 h-12 text-slate-300 mb-3" />
                      <p className="text-center text-text-muted font-bold text-sm">
                        {t("reviews.noReviews")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}