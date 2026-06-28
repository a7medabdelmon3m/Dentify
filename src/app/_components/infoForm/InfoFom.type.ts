import { basicInfoSchema } from "./InfoForm.schema";
import * as z from "zod";

export type infoType = z.infer<ReturnType<typeof basicInfoSchema>>