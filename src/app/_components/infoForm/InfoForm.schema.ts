import * as z from 'zod'

export const basicInfoSchema = (t: (key: string) => string) => z.object({
  fullName: z
    .string()
    .min(3, { message: t("basic_info.errors.name_min") })
    .max(25, { message: t("basic_info.errors.name_max") }),
  phoneNumber: z
    .string()
    .min(10, { message: t("basic_info.errors.phone_invalid") }),
  dob: z
    .string()
    .min(1, { message: t("basic_info.errors.dob_required") }),
  email: z
    .string()
    .email({ message: t("basic_info.errors.email_invalid") }),
  location: z
    .string()
    .min(1, { message: t("basic_info.errors.location_required") }),
});