import * as z from 'zod'

export const passwordSchema = (t: (key: string) => string) => z.object({
  currentPassword: z
    .string()
    .min(1, { message: t("security.errors.current_required") }),
  newPassword: z
    .string()
    .min(8, { message: t("security.errors.new_min") })
    .regex(/[A-Z]/, { message: t("security.errors.password_uppercase") })
    .regex(/[a-z]/, { message: t("security.errors.password_lowercase") })
    .regex(/[0-9]/, { message: t("security.errors.password_number") })
    .regex(/[^A-Za-z0-9]/, { message: t("security.errors.password_special") }),
  confirmPassword: z
    .string()
    .min(1, { message: t("security.errors.confirm_required") }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: t("security.errors.mismatch"),
  path: ['confirmPassword'],
});