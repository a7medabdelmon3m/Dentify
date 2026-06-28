import React from "react";
import CreateCaseContainer from "./CreateCaseContainer";
import PageHeader from "@/app/_components/PageHeader";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("CreateCase");

  return (
    <section className=" flex-1">
      <div className="container p-4 mx-auto space-y-4 ">
       
          <PageHeader
            title={t("headerTitle")}
            desc={t("headerDesc")}
          />
          <div>
            <CreateCaseContainer />
          </div>
        
      </div>
    </section>
  );
}