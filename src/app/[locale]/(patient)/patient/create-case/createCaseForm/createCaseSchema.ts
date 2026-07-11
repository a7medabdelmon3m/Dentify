import * as z from "zod";

export const CreateCaseSchema = (t: (key: string) => string) => z.object({
  Image: z.any()
    .refine((file) => file !== undefined && file !== null && file !== "", {
      message: t("validation.imageRequired"),
    }),
  City: z.string().min(1, t("validation.cityRequired")),
  SymptomsText: z.string().optional(),
  PainDuration: z.string().optional(),
  ChronicDiseases: z.string().optional(),
});

export type CreateCaseFormValues = z.infer<ReturnType<typeof CreateCaseSchema>>;