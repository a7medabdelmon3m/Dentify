import { passwordSchema } from "./ChangePass.schema";
import * as z from "zod";

export type changePassType = z.infer<typeof passwordSchema >