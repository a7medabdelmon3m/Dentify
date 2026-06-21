import * as z from "zod";

export const CaseSchema = (t: (key: string) => string) =>
  z.object({
    requiredSpecialization: z.string().optional().nullable(),
    description: z
      .string()
      .min(15, t("validation.description.min"))
      .max(1200, t("validation.description.max"))
      .nonempty(t("validation.description.required")),
    city:z.string().min(1, t("validation.city.required")),
    image: z.any().optional().nullable(),
  }).superRefine((data, ctx) => {
    if (!data.requiredSpecialization && (!data.image || data.image.length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("validation.case_error"),
        path: ["requiredSpecialization"],
      });
    }
  });