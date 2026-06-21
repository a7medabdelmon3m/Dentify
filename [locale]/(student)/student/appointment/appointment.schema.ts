import * as z from "zod";

export const getAppointmentSchema = (t:any) => z.object({
  treatmentRequestId: z.number(),
  slots: z.array(
    z.object({
      appointmentDate: z.string().min(1, { message: t("errors.dateRequired") }),
      location: z
        .string()
        .min(3, { message: t("errors.locationMin") })
        .max(100, { message: t("errors.locationMax") }),
    })
  ).min(1, { message: t("errors.atLeastOneSlot") }),
});

// عشان نستنتج الـ Type بسهولة ونستخدمه في الفورم
export type ProposeAppointmentFormType = z.infer<ReturnType<typeof getAppointmentSchema>>;