"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClipboardList,
  Handshake,
  MapPin,
  CalendarDays,
  User,
  FileText,
  Inbox,
  Activity,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/app/_components/EmptyState";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { dynamicApiAction } from "@/app/[locale]/(patient)/patient/patient.actions"; 

const ProposalDetailsDialog = dynamic(
  () => import("./ProposalDetailsDialog").then((mod) => mod.ProposalDetailsDialog),
  { ssr: false }
);

interface FormattedProposal {
  id: number;
  caseId: number;
  patientName: string;
  city: string;
  date: string;
  type: "patientOffer" | "myRequest";
  description: string;
  diseaseName: string;
  myOfferText: string;
}

export default function ProposalsClient({ initialProposals }: { initialProposals: FormattedProposal[] }) {
  const t = useTranslations("StudentProposals");
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<"patientOffer" | "myRequest">("patientOffer");
  const [proposals] = useState<FormattedProposal[]>(initialProposals);
  const [selectedProposalDesc, setSelectedProposalDesc] = useState<string | null>(null);
  
  const [acceptingId, setAcceptingId] = useState<number | null>(null);

  const filteredProposals = proposals.filter((p) => p.type === activeTab);

  const handleAccept = async (requestId: number) => {
    try {
      setAcceptingId(requestId);
      
      const response = await dynamicApiAction(
        `TreatmentRequests/accept/${requestId}`,
        "PUT" 
      );

      if (response?.success || response?.data) {
        toast.success("تم قبول الطلب بنجاح!");
        router.refresh(); 
      } else {
        toast.error((response?.error as string) || "حدث خطأ أثناء قبول الطلب.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("حدث خطأ في الاتصال بالسيرفر، يرجى المحاولة لاحقاً.");
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <>
      <div className="flex overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl border border-border-light shadow-sm w-full sm:w-fit">
        {[
          { id: "patientOffer", label: t("tabs.patientOffers"), icon: Handshake, color: "text-blue-500" },
          { id: "myRequest", label: t("tabs.myRequests"), icon: ClipboardList, color: "text-primary" },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-colors duration-300 flex-1 sm:flex-none justify-center cursor-pointer ${
                isActive ? "text-primary" : "text-text-muted hover:text-text-title"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="proposalsTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-4 h-4 relative z-10 ${isActive ? tab.color : ""}`} />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {filteredProposals.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-white p-5 rounded-2xl border border-border-light shadow-sm flex flex-col gap-4 transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start border-b border-border-light pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        proposal.type === "patientOffer" ? "bg-blue-50 text-blue-600" : "bg-primary/10 text-primary"
                      }`}>
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-bold mb-0.5">
                          {t("card.patient")}
                        </p>
                        <h4 className="font-bold text-text-title text-sm">
                          {proposal.patientName}
                        </h4>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${
                      proposal.type === "patientOffer" 
                        ? "bg-blue-50 text-blue-600 border-blue-200" 
                        : "bg-primary-subtle text-primary border-primary/20"
                    }`}>
                      {t(`card.type.${proposal.type}`)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-title capitalize">
                      <MapPin className="text-primary w-3.5 h-3.5" />
                      {proposal.city}
                    </span>
                    <span className="flex items-center gap-1.5 bg-bg-main border border-border-light px-3 py-1.5 rounded-lg text-xs font-bold text-text-muted">
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span dir="ltr">{proposal.date}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600">
                      <Activity className="w-3.5 h-3.5" />
                      {proposal.diseaseName}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 bg-slate-50 p-3 rounded-xl border border-border-light">
                    <div className="flex items-center gap-1.5 text-text-muted">
                      <FileText className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase">
                        {t("card.patientComplaint")}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-text-body line-clamp-2 leading-relaxed text-right">
                      {proposal.description}
                    </p>
                  </div>

                  <div className="pt-2 mt-auto">
                    {proposal.type === "patientOffer" ? (
                      <Button 
                        onClick={() => handleAccept(proposal.id)}
                        disabled={acceptingId === proposal.id}
                        className="w-full font-bold text-xs rounded-xl h-10 bg-primary hover:bg-primary-hover text-white shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        {acceptingId === proposal.id ? (
                          "جاري القبول..."
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            {t("card.acceptBtn")}
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedProposalDesc(proposal.myOfferText)}
                        className="w-full font-bold text-xs rounded-xl h-10 cursor-pointer hover:bg-gray-200 text-text-title"
                      >
                        {t("card.viewMyRequestBtn")}
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <ProposalDetailsDialog
                isOpen={!!selectedProposalDesc}
                setIsOpen={() => setSelectedProposalDesc(null)}
                proposalText={selectedProposalDesc || ""}
              />
            </motion.div>
          ) : (
            <motion.div
              key="emptyState"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <EmptyState
                icon={
                  activeTab === "patientOffer" ? (
                    <Inbox className="w-10 h-10" />
                  ) : (
                    <Handshake className="w-10 h-10" />
                  )
                }
                title={
                  activeTab === "patientOffer"
                    ? t("emptyState.patientOffersTitle")
                    : t("emptyState.myRequestsTitle")
                }
                description={
                  activeTab === "patientOffer"
                    ? t("emptyState.patientOffersDesc")
                    : t("emptyState.myRequestsDesc")
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}