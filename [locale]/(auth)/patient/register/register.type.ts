import { RegisterSchema } from "./RegisterSchema";
import * as z from "zod";

export type patientRegisterType = z.infer<typeof RegisterSchema>