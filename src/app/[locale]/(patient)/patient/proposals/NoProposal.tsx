import { FaBriefcase } from "react-icons/fa";

import React from "react";
import { getTranslations } from "next-intl/server";

export default async function NoProposal() {
    const t = await getTranslations('proposal.noProposals')
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full p-8 text-center animate-in fade-in duration-500">
      <div className="flex items-center justify-center w-20 h-20 bg-gray-50 border border-gray-100 rounded-2xl mb-6 shadow-sm">
        <FaBriefcase className="w-10 h-10 text-gray-400 opacity-80" />
      </div>

      <div className="max-w-sm space-y-2">
        <h3 className="font-heading font-bold text-lg text-text-title">
          {t(`title`)}
        </h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          {t(`description`)}
        </p>
      </div>
    </div>
  );
}
