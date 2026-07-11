import { RegisterSchema } from "./RegisterSchema";
import * as z from "zod";

export type patientRegisterType = z.infer<ReturnType<typeof RegisterSchema>>;
