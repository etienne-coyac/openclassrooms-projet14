import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Employee } from "../types/employee.types";

interface HeadCell {
  id: keyof Employee;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "firstname", label: "First Name" },
  { id: "lastname", label: "Last Name" },
  { id: "birthdate", label: "Birth Date" },
  { id: "startdate", label: "Start Date" },
  { id: "street", label: "Street" },
  { id: "city", label: "City" },
  { id: "state", label: "State" },
  { id: "department", label: "Department" },
  { id: "zip", label: "Zip" }
];
type Order = "asc" | "desc";

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Employee) => void;
  order: Order;
  orderBy: string;
}

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Employee) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align="left" sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
