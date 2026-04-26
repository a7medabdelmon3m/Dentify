import React from "react";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/app/_components/PageHeader";
import ProposalCard from "./ProposalCard";

export default async function page() {
  // تم تغيير الـ namespace لـ proposal
  const t = await getTranslations("proposal");

  return (
    <section className="bg-[#F3F4FF] flex-1">
      <div className="container p-4 mx-auto ">
        <PageHeader
          title={t("title")}
          desc={t("description")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
          <ProposalCard />
        </div>
      </div>
    </section>
  );
}