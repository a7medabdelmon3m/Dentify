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
  // تم تغيير الـ namespace لـ proposal
  const t = await getTranslations("proposal");
  const myCase = await apiRequest<patientCaseType[]>(
    "http://localhost:5123/api/Case/my-cases",
  );
  const singleCase: patientCaseType | undefined = myCase.data && myCase.data?.length > 0 ? myCase.data[0] : undefined;
  const caseStatus = singleCase?.status ;
  const proposals = await apiRequest<proposalType[]>(
    "http://localhost:5123/api/TreatmentRequests/cases",
  );
  const proList = proposals.data;

  // console.log("proposals : ", proList);

  return (
    <section className="flex-1">
      <div className="container p-4 mx-auto space-y-4 ">
        <PageHeader title={t("title")} desc={t("description")} />
        {caseStatus === 'Assigned' ? <AssignedCaseState id = {String(singleCase?.id)}/> :  proList?.length === 0 || !proList ? (
          <NoProposal />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {proList.map((pro) => (
              <ProposalCard proposal={pro} key={pro.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
