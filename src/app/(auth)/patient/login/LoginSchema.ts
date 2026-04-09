import * as z from "zod";

export const LoginSchema = z.object({
  Email: z.email("Email Is Not In Format!").nonempty("Email Is Required!"),
  Password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Your Password Must Be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
    )
    .nonempty("Password Is Required!"),
});
