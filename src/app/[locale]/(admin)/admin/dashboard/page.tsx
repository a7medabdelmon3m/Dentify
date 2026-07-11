import React from "react";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/app/_components/PageHeader";
import StudentReviewClient from "./StudentReviewClient";
import { apiRequest } from "@/app/api/services/denti.services";
import { RegisterFormValues } from "@/type";

// const MOCK_PENDING_STUDENTS: PendingStudentType[] = [
//   {
//     id: 1,
//     fullName: "أحمد عبد المنعم محمد",
//     uniEmail: "ahmed.ali@dent.bsu.edu.eg",
//     email: "ahmed_personal@gmail.com",
//     phoneNumber: "01012345678",
//     city: "بني سويف",
//     specializations: ["حشو عصب", "خلع"],
//   },
//   {
//     id: 2,
//     fullName: "محمود حسن سعيد",
//     uniEmail: "mahmoud.h@student.bsu.edu.eg",
//     email: "mahmoud_99@yahoo.com",
//     phoneNumber: "01198765432",
//     city: "القاهرة",
//     specializations: ["تركيبات ثابتة"],
//   },
//   {
//     id: 3,
//     fullName: "يوسف هشام السيد",
//     uniEmail: "fake.email@gmail.com", // ده مثلاً هيترفض عشان مش إيميل كلية
//     email: "youssef@gmail.com",
//     phoneNumber: "01233334444",
//     city: "الجيزة",
//     specializations: ["تنظيف جير", "تقويم"],
//   }
// ];

export default async function AdminStudentsReviewPage() {
  const t = await getTranslations("AdminStudentReview");

  const response = await apiRequest<RegisterFormValues[]>("http://localhost:5123/api/Admin/students");
  const pendingStudents = response?.data || [];

  return (
    <section className="flex-1 bg-bg-main min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <PageHeader 
          title={t("pageTitle")} 
          desc={t("pageDesc")} 
        />

        <StudentReviewClient initialStudents={pendingStudents} />
        
      </div>
    </section>
  );
}