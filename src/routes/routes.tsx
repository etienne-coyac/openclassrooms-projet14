import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CreateEmployee from "../views/CreateEmployee";
import EmployeeList from "../views/EmployeeList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <CreateEmployee />
      },
      {
        path: "/employee-list",
        element: <EmployeeList />
      }
    ]
  }
]);
