import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../types/employee.types";

export interface EmployeeState {
  value: Employee[];
}

const initialState: EmployeeState = {
  value: []
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state: EmployeeState, action: PayloadAction<Employee>) => {
      state.value = [...state.value, action.payload];
    }
  }
});

// Action creators are generated for each case reducer function
export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
