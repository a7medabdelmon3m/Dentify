import React from "react";
import { FaFilter } from "react-icons/fa";
import AvailableDoctorCard from "./AvailableDoctorCard";
import PageHeader from "@/app/_components/PageHeader";
import { egyptGovernorates } from "@/app/constants/locations";
import AvailableDoctorsFilter from "./availableDoctorsFilter";
import { apiRequest } from "@/app/api/services/denti.services";
import { availableDoctorsType, patientCaseType } from "@/type";
import { getTranslations } from "next-intl/server";
import NoDoctors from "./NoDoctors";
import { cookies } from "next/headers";
import EmptyDoctorsState from "./NoDoctors";
import CaseAssignedBlocker from "./CaseAssignedBlocker";

export default async function AvailableDoctorsPage() {
  const cookieStore = await cookies();
  const cId = cookieStore.get("caseId")?.value;
  console.log("cId : ", cId);

  const t = await getTranslations("available-doctors.AvailableDoctorsPage");
  const myCase = await apiRequest<patientCaseType[]>(
    "http://localhost:5123/api/Case/my-cases",
  );
  const singleCase: patientCaseType | undefined =
    myCase.data && myCase.data?.length > 0 ? myCase.data[0] : undefined;
  const caseStatus = singleCase?.status;

  const availableDoctors = await apiRequest<availableDoctorsType[]>(
    `http://localhost:5123/api/Patient/available-students/${cId}`,
  );
  const realData = availableDoctors.data;
  // console.log('availableDoctors : ' ,availableDoctors);

  return (
    <section className="flex-1 ">
      <div className="container  mx-auto p-4 space-y-4 ">
        <PageHeader title={t("title")} desc={t("desc")} />
        {(realData && caseStatus !== 'Assigned') && (
          <div className="bg-white rounded-lg flex gap-3 items-center w-fit px-3 py-1">
            <div className="w-10 h-10 rounded-lg flex justify-center items-center bg-blue-100 text-blue-500 text-xl">
              <FaFilter />
            </div>
            <div className="flex gap-6 items-center">
              <div>
                <p className="text-md font-medium text-text-body">
                  {t("filterLabel")}
                </p>

                <AvailableDoctorsFilter />
              </div>
            </div>
          </div>
        )}

        { caseStatus === 'Assigned' ?<CaseAssignedBlocker cId={String(cId)}/> :  realData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {realData.map((doctor, idx) => (
              <AvailableDoctorCard doctor={doctor} key={idx} />
            ))}
          </div>
        ) : !cId ? (
          <EmptyDoctorsState variant="no-case" />
        ) : (
          <EmptyDoctorsState />
        )}
      </div>
    </section>
  );
}
