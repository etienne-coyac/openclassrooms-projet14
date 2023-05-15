import * as z from "zod";

export const employeeSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  birthdate: z.date(),
  startdate: z.date(),
  address: z.object({
    street: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    state: z.string().min(2).max(50),
    zipcode: z.string().length(5)
  }),
  department: z.string()
});
