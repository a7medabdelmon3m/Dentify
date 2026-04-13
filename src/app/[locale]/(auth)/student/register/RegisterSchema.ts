import * as z from "zod";

export const RegisterSchema = (t: (key: string) => string) => z.object({
  Name: z
    .string(t('validation.name.invalid'))
    .min(3, t('validation.name.min'))
    .max(25, t('validation.name.max'))
    .nonempty(t('validation.name.required')),
  academicEmail: z
    .email(t('validation.email.required'))
    .nonempty(t('validation.email.format')),
  Code: z
    .string()
    .regex(/^\d{6}$/, t('validation.code.required'))
    .nonempty(t('validation.code.length')),
  Password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      t('validation.password.regex'),
    )
    .nonempty(t('validation.password.required')),
  rePassword: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      t('validation.password.regex'),
    )
    .nonempty(t('validation.password.required')),
}).refine((value) => value.Password === value.rePassword , {message:t('validation.password.mismatch') ,path:['rePassword']});
