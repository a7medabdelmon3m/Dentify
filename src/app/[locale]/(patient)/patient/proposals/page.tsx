import React from "react";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/app/_components/PageHeader";
import ProposalCard from "./ProposalCard";
import { apiRequest } from "@/app/api/services/denti.services";
import { patientCaseType, proposalType } from "@/type";
import NoProposal from "./NoProposal";
import { cookies } from "next/headers";
import AssignedCaseState from "./AssignedCaseState";

export default async function page() {
  const t = await getTranslations("proposal");
  const myCase = await apiRequest<patientCaseType[]>(
    "http://localhost:5123/api/Case/my-cases",
  );
  const singleCase: patientCaseType | undefined =
    myCase.data && myCase.data?.length > 0 ? myCase.data[0] : undefined;
  const caseStatus = singleCase?.status;
  const proposals = await apiRequest<proposalType[]>(
    "http://localhost:5123/api/TreatmentRequests/cases",
  );
  const proList = proposals.data;


  return (
    <section className="flex-1">
      <div className="container p-4 mx-auto space-y-4 ">
        <PageHeader title={t("title")} desc={t("description")} />
        {caseStatus === "Assigned" ? (
          <AssignedCaseState id={String(singleCase?.id)} />
        ) : proList?.length === 0 || !proList ? (
          <NoProposal />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proList.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
