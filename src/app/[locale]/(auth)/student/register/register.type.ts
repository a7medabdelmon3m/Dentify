import { RegisterSchema } from "./RegisterSchema";
import * as z from "zod";

export type studentRegisterType = z.infer<typeof RegisterSchema>