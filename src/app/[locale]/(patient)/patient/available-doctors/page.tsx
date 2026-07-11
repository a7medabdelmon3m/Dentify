import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import { egyptGovernorates } from "@/app/constants/locations";
import { apiRequest } from "@/app/api/services/denti.services";
import { availableDoctorsType, patientCaseType } from "@/type";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import EmptyDoctorsState from "./NoDoctors";
import CaseAssignedBlocker from "./CaseAssignedBlocker";
import AvailableDoctorsClient from "./AvailableDoctorsClient"; 

export default async function AvailableDoctorsPage() {
  const cookieStore = await cookies();
  const cId = cookieStore.get("caseId")?.value;
  console.log("cId : ", cId);

  const t = await getTranslations("available-doctors.AvailableDoctorsPage");
  const g = await getTranslations("governorates");
  const tSearch = await getTranslations("SearchInput");
  const tEmpty = await getTranslations("available-doctors.emptyStates.no-doctors");

  const myCase = await apiRequest<patientCaseType[]>(
    "http://localhost:5123/api/Case/my-cases"
  );
  const singleCase: patientCaseType | undefined =
    myCase.data && myCase.data?.length > 0 ? myCase.data[0] : undefined;
  const caseStatus = singleCase?.status;

  const availableDoctors = await apiRequest<availableDoctorsType[]>(
    `http://localhost:5123/api/Patient/available-students`
  );
  const realData = availableDoctors.data;

  const uniToGov: Record<string, string> = {
    cairo_uni: "giza",
    alex_uni: "alexandria",
    ain_shams_uni: "cairo",
    mansoura_uni: "dakahlia",
    tanta_uni: "gharbia",
    assiut_uni: "assiut",
    azhar_uni: "cairo",
    minia_uni: "minya",
    beni_suef_uni: "beni_suef",
    suez_canal_uni: "ismailia",
    zagazig_uni: "sharkia",
    helwan_uni: "cairo",
    kafr_elshiekh_uni: "kafr_el_sheikh",
    fayoum_uni: "fayoum",
    sohag_uni: "sohag",
    aswan_uni: "aswan",
    south_valley_uni: "qena",
    port_said_uni: "port_said",
    sadat_uni: "monufia",
    domiat_uni: "damietta"
  };

  const enhancedData = realData?.map(doc => ({
    ...doc,
    governorate: uniToGov[doc.city as string] || doc.city
  })) || [];

  const locationOptions = egyptGovernorates.map((item) => ({
    label: g(item.value),
    value: item.value,
  }));

  const dropdownFilters = [
    {
      key: "governorate",
      placeholder: t("selectPlaceholder") || "كل المحافظات",
      options: locationOptions,
    },
  ];

  return (
    <section className="flex-1">
      <div className="container mx-auto p-4 space-y-6">
        <PageHeader title={t("title")} desc={t("desc")} />

        {caseStatus === "Assigned" ? (
          <CaseAssignedBlocker cId={String(cId)} />
        ) : enhancedData.length > 0 ? (
          <AvailableDoctorsClient
            data={enhancedData}
            dropdownFilters={dropdownFilters}
            searchPlaceholder={tSearch("placeholder")}
            emptyStateTitle={tEmpty("title")}
            emptyStateDesc={tEmpty("description")}
          />
        ) : !cId ? (
          <EmptyDoctorsState variant="no-case" />
        ) : (
          <EmptyDoctorsState />
        )}
      </div>
    </section>
  );
}