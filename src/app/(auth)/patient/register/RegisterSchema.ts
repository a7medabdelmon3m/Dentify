import * as z from "zod";

export const RegisterSchema = z.object({
  Name: z
    .string("Name Must Be String!")
    .min(3, "Name Must Be At Least Three Letters!")
    .max(25, "Name Must Be Maximum 25 Letters!")
    .nonempty("Name Is Required!"),
  Email: z
    .email("Email Is Not In Format!")
    .nonempty("Email Is Required!"),
  Code: z
    .string()
    .regex(/^\d{6}$/, "Code Must Be 6 Numbers!")
    .nonempty("Code Is Required!"),
  Password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Your Password Must Be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
    )
    .nonempty("Password Is Required!"),
  rePassword: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Your Password Must Be Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
    )
    .nonempty("Password Is Required!"),
}).refine((value) => value.Password === value.rePassword , {error:'Passwords Are Inmatch!' ,path:['rePassword']});
