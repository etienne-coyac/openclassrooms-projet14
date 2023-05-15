import * as z from "zod";
import { employeeSchema } from "./schemas/employee.schemas";

export type Employee = z.infer<typeof employeeSchema>;
