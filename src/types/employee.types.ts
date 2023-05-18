import * as z from "zod";
import { employeeSchema } from "./schemas/employee.schemas";
import { departments } from "../utils/department.utils";

export type Employee = z.infer<typeof employeeSchema>;

export type Department = (typeof departments)[number];

export type State = { name: string; abbreviation: string };

export type ErrorType = {
  field: string;
  message: string;
};
