import { RegisterSchema } from "./RegisterSchema";
import * as z from "zod";

export type loginType = z.infer<typeof RegisterSchema>