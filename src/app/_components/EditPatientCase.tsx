"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCaseForm from "../[locale]/(patient)/patient/create-case/createCaseForm/CreateCaseForm";
// Workaround: CreateCaseForm props typing isn't recognized here, cast to any for usage
const CreateCaseFormAny = CreateCaseForm as any;
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { patientCaseType } from "@/type"; 
import { useState } from "react";

export function EditPatientCase({
  caseData,
  cleanImage,
}: {
  caseData: patientCaseType;
  cleanImage: string;
}) {
  const t = useTranslations("cases.CaseCard");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
        onClick={() => setIsOpen(true)}
          title={t("editTitle")}
          className="h-auto bg-primary/10 text-primary border border-primary/20 rounded-xl px-4 py-2 hover:bg-primary hover:text-white transition-colors cursor-pointer flex items-center justify-center"
        >
          <FaEdit className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white w-[95vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-text-title text-start">
            {t("editDialogTitle")}
          </DialogTitle>
          <DialogDescription className="text-start text-text-muted">
            {t("editDialogDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[65vh] md:max-h-[75vh] overflow-y-auto px-4 py-2">
          <CreateCaseFormAny
            isEditMode={true}
            initialData={{
              id: caseData.id,
              requiredSpecialization: caseData.specidRequiredSpecialization, 
              city: caseData.city, 
              imageUrl: cleanImage, 
            }}
            onSuccess={() => setIsOpen(false)}
          />
        </div>

        <DialogFooter className="sm:justify-start pt-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl px-6">
              {t("closeBtn")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
