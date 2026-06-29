import React from "react";
import { getTranslations } from "next-intl/server";
import { apiRequest } from "@/app/api/services/denti.services";
import { profileType } from "@/type";

// مكوناتك
import PageHeader from "@/app/_components/PageHeader";
import ProfileImage from "@/app/_components/profileImage";
import InfoForm from "@/app/_components/infoForm/InfoForm";
import ChangePassForm from "@/app/_components/changePasswoedForm/ChangePassForm";

// الأيقونات
import { FaUserDoctor, FaRegUser, FaShieldHalved } from "react-icons/fa6";
import { MapPin, Phone, Mail, GraduationCap } from "lucide-react";

export default async function ProfilePage() {
  const t = await getTranslations("profile");
  const g = await getTranslations("governorates");

  const userData = { cityKey: "beni_suef" };
  const profileDetailsResponse = await apiRequest<profileType>(
    "http://localhost:5123/api/Account/profile",
  );
  const profileDetails = profileDetailsResponse.data;

  // الحماية والتأكد من وجود داتا
  if (!profileDetails) return null;

  const role = profileDetails.role || "Patient";
  const isStudent = role === "Student";

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ── عنوان الصفحة ── */}
        <PageHeader
          title={t("profile_header.title")}
          desc={t("profile_header.description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-rightAr">
          {/* ── العمود الأول: الكارت التعريفي (Profile Card) ── */}
          <div className="lg:col-span-1 space-y-6">
            {/* صورة البروفايل */}
            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-2">
              <ProfileImage
                userName={profileDetails.fullName}
                role={role}
                rating={4.8} // داتا وهمية للتقييم، ممكن تجيبها من الـ API
              />
            </div>

            {/* تفاصيل الاتصال (Contact Info) */}
            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 space-y-4">
              <h3 className="font-heading font-bold text-lg text-text-title mb-4 border-b border-border-light pb-3">
                معلومات التواصل
              </h3>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold">
                    {t("basic_info.governorate_label")}
                  </p>
                  <p className="text-sm font-bold text-text-title">
                    {g(userData.cityKey)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-bold">
                    {t("basic_info.phone_label")}
                  </p>
                  <p className="text-sm font-bold text-text-title" dir="ltr">
                    {profileDetails.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-text-muted font-bold">
                    {t("basic_info.email_label")}
                  </p>
                  <p className="text-sm font-bold text-text-title truncate">
                    {profileDetails.email}
                  </p>
                </div>
              </div>

              {isStudent && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-main flex items-center justify-center text-primary shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-text-muted font-bold">
                      {t("basic_info.university")}
                    </p>
                    <p className="text-sm font-bold text-text-title">
                      جامعة بني سويف
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── العمود الثاني: نماذج التعديل والأمان (Forms) ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* نموذج تعديل البيانات */}
            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-border-light pb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {isStudent ? (
                    <FaUserDoctor className="w-6 h-6" />
                  ) : (
                    <FaRegUser className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-text-title">
                    {t("basic_info.edit_title")}
                  </h2>
                  <p className="text-sm text-text-muted font-medium">
                    تحديث بياناتك الشخصية {isStudent && "ومعلوماتك المهنية"}
                  </p>
                </div>
              </div>

              <InfoForm role={role} defaultData={profileDetails} />
            </div>

            {/* نموذج إعدادات الأمان (تغيير الباسورد) */}
            <div className="bg-white border border-border-light rounded-3xl shadow-sm p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-border-light pb-4">
                <div className="w-12 h-12 rounded-2xl bg-danger/10 flex items-center justify-center text-danger">
                  <FaShieldHalved className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-text-title">
                    {t("security.title")}
                  </h2>
                  <p className="text-sm text-text-muted font-medium">
                    حافظ على أمان حسابك وقم بتغيير كلمة المرور دورياً
                  </p>
                </div>
              </div>

              <ChangePassForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
