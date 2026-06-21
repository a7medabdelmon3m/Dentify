import { LoginSchema } from "./LoginSchema";
import * as z from "zod";

export type patientLoginType = z.infer<typeof LoginSchema>