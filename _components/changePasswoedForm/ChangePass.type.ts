import * as z from "zod";
import { passwordSchema } from "./ChangePass.schema";

export type ChangePassType = z.infer<
  ReturnType<typeof passwordSchema>
>;