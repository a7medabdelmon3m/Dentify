import * as z from "zod";

export const LoginSchema = (t: (key: string) => string) => z.object({
  email: z
    .string()
    .email(t(`validation.email.format`))
    .nonempty(t(`validation.email.required`)),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      t(`validation.password.regex`),
    )
    .nonempty(t(`validation.password.required`)),
});
