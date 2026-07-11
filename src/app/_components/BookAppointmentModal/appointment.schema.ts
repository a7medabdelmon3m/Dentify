import * as z from "zod";

export const getAppointmentSchema = (t: any) => z.object({
  treatmentRequestId: z.number(),
  appointmentDate: z.string().min(1, { message: t("errors.dateRequired") }),
  location: z
    .string()
    .min(3, { message: t("errors.locationMin") })
    .max(100, { message: t("errors.locationMax") }),
});

export type ProposeAppointmentFormType = z.infer<ReturnType<typeof getAppointmentSchema>>;