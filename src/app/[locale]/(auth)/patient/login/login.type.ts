import { LoginSchema } from "./LoginSchema";
import * as z from "zod";

export type loginType = z.infer<typeof LoginSchema>