import * as z from 'zod'

export const basicInfoSchema = (t: (key: string) => string) => z.object({
  fullName: z
    .string()
    .min(3, { message: t("basic_info.errors.name_min") })
    .max(25, { message: t("basic_info.errors.name_max") }),
  phoneNumber: z
    .string()
    .regex(/^(?:\+20|002)?01[0125][0-9]{8}$/ , { message: t("basic_info.errors.phone_invalid") }),
    specializations: z.array(z.number()).nullable().optional(),
  
});