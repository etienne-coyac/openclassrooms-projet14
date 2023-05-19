import * as z from "zod";
import { states } from "../../utils/state.utils";

type StateProp = (typeof states)[number]["abbreviation"];
const stateEnum: [StateProp, ...StateProp[]] = [
  states[0].abbreviation,
  ...states.slice(1).map((state) => state.abbreviation)
];
console.log(stateEnum);

export const employeeSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  birthdate: z.string(), //z.date(),
  startdate: z.string(), // z.date(),
  address: z.object({
    street: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    state: z.string(),
    zipcode: z.string().regex(/\d{5}/)
  }),
  department: z.string()
});
