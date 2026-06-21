import { LoginSchema } from "./LoginSchema";
import * as z from "zod";

export type studentLoginType = z.infer<typeof LoginSchema>