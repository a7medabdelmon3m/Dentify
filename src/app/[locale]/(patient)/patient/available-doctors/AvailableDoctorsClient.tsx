"use client";

import React from "react";
import DynamicFilterWrapper from "@/app/_components/DynamicFilterWrapper";
import AvailableDoctorCard from "./AvailableDoctorCard";
import { availableDoctorsType } from "@/type";

interface AvailableDoctorsClientProps {
  data: any[];
  dropdownFilters: any[];
  searchPlaceholder: string;
  emptyStateTitle: string;
  emptyStateDesc: string;
}

export default function AvailableDoctorsClient({
  data,
  dropdownFilters,
  searchPlaceholder,
  emptyStateTitle,
  emptyStateDesc,
}: AvailableDoctorsClientProps) {
  return (
    <DynamicFilterWrapper
      data={data}
      searchKeys={["name", "university", "governorate"] as any[]}
      searchPlaceholder={searchPlaceholder}
      dropdownFilters={dropdownFilters}
      renderItem={(doctor, idx) => (
        <AvailableDoctorCard doctor={doctor as availableDoctorsType} key={idx} />
      )}
      emptyStateTitle={emptyStateTitle}
      emptyStateDesc={emptyStateDesc}
    />
  );
}