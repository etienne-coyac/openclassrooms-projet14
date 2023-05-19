import { useState } from "react";
import "../style/createEmployee.scss";
import { departments, getPrettyDepartmentName } from "../utils/department.utils";
import { states } from "../utils/state.utils";
import { useDispatch } from "react-redux";
import { addEmployee } from "../app/features/employeeSlice";
import { employeeSchema } from "../types/schemas/employee.schemas";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { Dayjs } from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

interface FormErrorsType {
  firstname: boolean | string;
  lastname: boolean | string;
  birthdate: boolean | string;
  startdate: boolean | string;
  street: boolean | string;
  city: boolean | string;
  state: boolean | string;
  department: boolean | string;
  zip: boolean | string;
}

function CreateEmployee() {
  const dispatch = useDispatch();

  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [birthdate, setBirthDate] = useState<Dayjs | null>(null);
  const [startdate, setStartDate] = useState<Dayjs | null>(null);
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [zip, setZip] = useState<string>("");

  // const [errors, setErrors] = useState<ErrorType[]>([]);
  const initialErrors: FormErrorsType = {
    firstname: false,
    lastname: false,
    birthdate: false,
    startdate: false,
    street: false,
    city: false,
    state: false,
    department: false,
    zip: false
  };
  const [errors, setErrors] = useState<FormErrorsType>(initialErrors);

  const [open, setOpen] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const employee = {
        firstname,
        lastname,
        birthdate: birthdate?.toDate(),
        startdate: startdate?.toDate(),
        street,
        city,
        state,
        zip,
        department
      };
      dispatch(addEmployee(employeeSchema.parse(employee)));

      setOpen(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.name === "ZodError") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const zodErrors = e.issues.reduce((acc: FormErrorsType, issue: any) => {
          const field = issue.path.at(-1) as keyof FormErrorsType;
          acc[field] = issue.message;
          return acc;
        }, initialErrors);
        setErrors({ ...zodErrors });
      }
    }
  };

  return (
    <>
      <form className="employee-form" onSubmit={handleSubmit}>
        <Grid container spacing={5} className="grid-form">
          <Grid item xs={12} sm={6} className="employee-data">
            <Typography variant="h5">Personal information</Typography>

            <FormControl error={errors.firstname !== false} className="form-group">
              <TextField
                label="Firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                error={errors.firstname !== false}
              />
              <FormHelperText>{errors.firstname}</FormHelperText>
            </FormControl>
            <FormControl error={errors.lastname !== false} className="form-group">
              <TextField
                label="Lastname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                error={errors.lastname !== false}
              />
              <FormHelperText>{errors.lastname}</FormHelperText>
            </FormControl>
            <FormControl error={errors.birthdate !== false} className="form-group">
              <DesktopDatePicker
                label="Birthdate"
                value={birthdate}
                onChange={(newValue) => {
                  setBirthDate(newValue);
                }}
              />
              <FormHelperText>{errors.birthdate}</FormHelperText>
            </FormControl>
            <FormControl error={errors.startdate !== false} className="form-group">
              <DesktopDatePicker
                label="Start date"
                value={startdate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
              />
              <FormHelperText>{errors.startdate}</FormHelperText>
            </FormControl>
            <FormControl error={errors.department !== false} className="form-group">
              <InputLabel id="select-department">Department</InputLabel>
              <Select
                label="Department"
                autoWidth
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  PaperProps: {
                    style: {
                      maxHeight: 300
                    }
                  }
                }}
              >
                <MenuItem value=""></MenuItem>
                {departments.map((department) => {
                  return (
                    <MenuItem key={department} value={department}>
                      {getPrettyDepartmentName(department)}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{errors.department}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} className="employee-data">
            <Typography variant="h5">Address</Typography>
            <FormControl error={errors.street !== false} className="form-group">
              <TextField
                label="Street"
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                error={errors.street !== false}
              />
              <FormHelperText>{errors.street}</FormHelperText>
            </FormControl>
            <FormControl error={errors.city !== false} className="form-group">
              <TextField
                label="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                error={errors.city !== false}
              />
              <FormHelperText>{errors.city}</FormHelperText>
            </FormControl>
            <FormControl error={errors.state !== false} className="form-group">
              <InputLabel id="select-state">State</InputLabel>
              <Select
                label="State"
                autoWidth
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  PaperProps: {
                    style: {
                      maxHeight: 300
                    }
                  }
                }}
              >
                <MenuItem value=""></MenuItem>
                {states.map((state) => {
                  return (
                    <MenuItem key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{errors.state}</FormHelperText>
            </FormControl>
            <FormControl error={errors.zip !== false} className="form-group">
              <TextField
                label="Zip"
                onChange={(e) => {
                  setZip(e.target.value);
                }}
                error={errors.zip !== false}
              />
              <FormHelperText>{errors.zip}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Button variant="contained" type="submit" color="success">
          Save
        </Button>
      </form>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New employee
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Employee created !
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default CreateEmployee;
