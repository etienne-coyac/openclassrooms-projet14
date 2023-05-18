import { Department } from "../types/employee.types";

export const departments = [
  "sales",
  "marketing",
  "engineering",
  "human_resources",
  "legal",
] as const;

export const getPrettyDepartmentName = (department: Department) => {
  switch (department) {
    case "sales":
      return "Sales";
    case "marketing":
      return "Marketing";
    case "engineering":
      return "Engineering";
    case "human_resources":
      return "Human Resources";
    case "legal":
      return "Legal";
  }
};
