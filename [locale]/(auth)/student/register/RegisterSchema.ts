import * as z from "zod";

export const RegisterSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z
      .string(t("validation.name.invalid"))
      .min(3, t("validation.name.min"))
      .max(25, t("validation.name.max"))
      .nonempty(t("validation.name.required")),
    userName: z
      .string(t("validation.username.invalid"))
      .min(3, t("validation.username.min"))
      .max(25, t("validation.username.max"))
      .nonempty(t("validation.username.required")),
    uniEmail: z
      .string()
      .regex(
        /^[a-zA-Z0-9._%+-]+@(dent|student)\.bsu\.edu\.eg$/,
        t(`validation.uniEmail.format`),
      )
      .nonempty(t("validation.uniEmail.nonempty")),
    email: z
      .email(t(`validation.email.format`))
      .nonempty(t(`validation.email.required`)),
    phoneNumber: z
      .string()
      .nonempty(t("validation.phoneNumber.required"))
      .regex(/^01[0-2,5]\d{8}$/, t("validation.phoneNumber.invalid")),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        t("validation.password.regex"),
      )
      .nonempty(t("validation.password.required")),
    city: z.string().nonempty(t("validation.university.required")),
    specializations: z
      .array(z.number())
      .nonempty(t("validation.diseases.required")),
  });
