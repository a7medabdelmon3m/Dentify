"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { FaFileLines } from "react-icons/fa6";

interface ProposalDetailsProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  proposalText: string;
}

export function ProposalDetailsDialog({ isOpen, setIsOpen, proposalText }: ProposalDetailsProps) {
  const t = useTranslations("StudentProposals.detailsDialog");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-bold text-lg">
            <FaFileLines className="text-primary" />
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium mt-2 bg-bg-main p-4 rounded-xl text-text-body border border-border-light leading-relaxed">
            {proposalText}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}