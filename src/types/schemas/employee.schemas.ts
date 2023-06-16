import * as z from "zod";
import { states } from "../../utils/state.utils";
import { departments } from "../../utils/department.utils";

export const employeeSchema = z.object({
  firstname: z.string().min(2, { message: "Firstname must be at least 2 caracters" }).max(50),
  lastname: z.string().min(2, { message: "Lastname must be at least 2 caracters" }).max(50),
  birthdate: z.date().transform((val) => val.toLocaleDateString("fr")),
  startdate: z.date().transform((val) => val.toLocaleDateString("fr")),

  street: z.string().min(2, { message: "Street must be at least 2 caracters" }).max(50),
  city: z.string().min(2, { message: "City must be at least 2 caracters" }).max(50),
  state: z.string().refine((val) => states.some((s) => s.abbreviation === val), { message: "State must be filled" }),
  zip: z.string().regex(/^\d{5}$/, { message: "Zip must be a valid zip code (5 digits)" }),

  department: z
    .string()
    .refine((val) => departments.map((d) => d.toString()).includes(val), { message: "Department must be filled" })
});
