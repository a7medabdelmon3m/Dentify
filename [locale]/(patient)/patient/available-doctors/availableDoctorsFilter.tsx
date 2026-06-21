"use client"
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { egyptGovernorates } from "@/app/constants/locations";

export default function AvailableDoctorsFilter() {
  const g = useTranslations("governorates");
  const t = useTranslations("available-doctors.AvailableDoctorsPage");

  return (
    <Select defaultValue="All">
      <SelectTrigger className="w-full max-w-48 ring-0 border-none border-b pt-1! focus-visible:ring-0 focus-visible:border-0 focus-visible:outline-0 bg-gray-50 cursor-pointer ">
        <SelectValue placeholder={t("selectPlaceholder")} />
      </SelectTrigger>
      <SelectContent
        position="popper"
        className="bg-white ring-0 focus-visible:outline-0"
      >
        <SelectGroup className="text-text-muted text-xs leading-4.5">
          <SelectItem value="All">{t("all")}</SelectItem>

          {egyptGovernorates.map((univer) => (
            <SelectItem key={univer.label} value={univer.value}>
              {g(univer.value)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
