import { useMemo, useState } from "react";
import { Employee } from "../types/employee.types";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import EnhancedTableHead from "./EnhancedTableHead";

function EmployeeTable() {
  const [stringFilter, setStringFilter] = useState<string>("");
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const compA = a[orderBy];
    const compB = b[orderBy];

    if (compA === "" && compB === "") return 0;
    if (compA === undefined || compA === null) return order === "asc" ? -1 : 1;
    if (compB === undefined || compB === null) return order === "asc" ? 1 : -1;
    if (orderBy === "birthdate" || orderBy === "startdate") {
      const compADate = new Date(compA.toString()).getTime();
      const compBDate = new Date(compB.toString()).getTime();
      if (compBDate < compADate) return 1;
      if (compBDate > compADate) return -1;
      return 0;
    }
    if (compB < compA) return 1;
    if (compB > compA) return -1;
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator(order: Order, orderBy: keyof Employee): (a: Employee, b: Employee) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Employee>("firstname");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const employees = useSelector((state: RootState) => state.employee.value);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Employee) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = employees.map((n) => n.firstname);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      employees
        .slice()
        .sort(getComparator(order, orderBy))
        .filter((e) => {
          if (stringFilter === "") return true;
          return e.firstname.includes(stringFilter) || e.lastname.includes(stringFilter);
        }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [employees, order, orderBy, stringFilter]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TextField
          label="Search"
          fullWidth
          value={stringFilter}
          onChange={(e) => setStringFilter(e.target.value)}
          error={visibleRows.length === 0}
        />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={employees.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={labelId} sx={{ cursor: "pointer" }}>
                    <TableCell component="th" id={labelId} scope="row">
                      {row.firstname}
                    </TableCell>
                    <TableCell align="left">{row.lastname}</TableCell>
                    <TableCell align="left">{row.birthdate.toLocaleDateString("en")}</TableCell>
                    <TableCell align="left">{row.startdate.toLocaleDateString("en")}</TableCell>
                    <TableCell align="left">{row.street}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.state}</TableCell>
                    <TableCell align="left">{row.department}</TableCell>
                    <TableCell align="left">{row.zip}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default EmployeeTable;
