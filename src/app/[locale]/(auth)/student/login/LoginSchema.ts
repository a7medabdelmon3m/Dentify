import * as z from "zod";

export const LoginSchema = (t: (key: string) => string) => z.object({
  Email: z.email((t(`validation.email.format`))).nonempty((t(`validation.email.required`))),
  Code: z
    .string()
    .regex(/^\d{6}$/, (t(`validation.code.length`)))
    .nonempty(t(`validation.code.required`)),
  Password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      t(`validation.password.regex`),
    )
    .nonempty(t(`validation.password.required`)),
});
