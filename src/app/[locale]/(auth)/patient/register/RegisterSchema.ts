// patient/register/RegisterSchema.ts
import * as z from "zod";

export const RegisterSchema = (t: (key: string) => string) => z.object({
  fullName: z.string().min(3, t("validation.name.min")).nonempty(t("validation.name.required")),
  email: z.string().email(t("validation.email.format")).nonempty(t("validation.email.required")),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, t("validation.password.regex")),
  
  age: z.coerce
    .number()
    .refine((value) => !Number.isNaN(value), { message: t("validation.age.invalid") })
    .min(18, t("validation.age.min"))
    .max(100, t("validation.age.max")),
  phoneNumber: z.string().regex(/^01[0-2,5]\d{8}$/, t("validation.phoneNumber.invalid")),
});