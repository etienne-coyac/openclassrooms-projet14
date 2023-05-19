import { useMemo, useState } from "react";
import LabelInput from "../components/LabelInput";
import "../style/createEmployee.scss";
import Dropdown from "../components/Dropdown";
import { Option } from "../types/dropdown.types";
import { departments, getPrettyDepartmentName } from "../utils/department.utils";
import { states } from "../utils/state.utils";
import { ErrorType } from "../types/employee.types";
import { useDispatch } from "react-redux";
import { addEmployee } from "../app/features/employeeSlice";
import { employeeSchema } from "../types/schemas/employee.schemas";

function CreateEmployee() {
  const dispatch = useDispatch();

  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [birthdate, setBirthDate] = useState<string>("");
  const [startdate, setStartDate] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<Option<string> | null>(null);
  const [department, setDepartment] = useState<Option<string> | null>(null);
  const [zip, setZip] = useState<string>("");

  const [errors, setErrors] = useState<ErrorType[]>([]);

  const departmentOptions = useMemo(() => {
    return departments.map((department) => {
      return {
        label: getPrettyDepartmentName(department),
        value: department
      };
    });
  }, []);

  const statesOptions = useMemo(() => {
    return states.map((state) => {
      return {
        label: state.name,
        value: state.abbreviation
      };
    });
  }, []);

  const handleDepartmentChange = (value: Option<string>) => {
    setDepartment(value);
  };
  const handleStateChange = (value: Option<string>) => {
    setState(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const employee = {
        firstname,
        lastname,
        birthdate,
        startdate,
        address: {
          street,
          city,
          state: state?.value,
          zipcode: zip
        },
        department: department?.value
      };
      dispatch(addEmployee(employeeSchema.parse(employee)));
    } catch (e: any) {
      if (e.name === "ZodError") {
        setErrors(
          e.issues.map((issue: any) => ({
            field: issue.path.at(-1),
            message: issue.message
          }))
        );
      }
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <LabelInput
        value={firstname}
        name="Firstname"
        placeholder="Enter your firstname"
        onChange={(value) => {
          setFirstName(value);
        }}
        error={errors.find((error) => error.field === "firstname")}
      />
      <LabelInput
        value={lastname}
        name="Lastname"
        onChange={(value) => {
          setLastName(value);
        }}
        error={errors.find((error) => error.field === "lastname")}
        placeholder="Enter your lastname"
      />
      <LabelInput
        value={birthdate}
        name="Birthdate"
        onChange={(value) => {
          setBirthDate(value);
        }}
        error={errors.find((error) => error.field === "birthdate")}
        placeholder="Enter your birthdate"
      />
      <LabelInput
        value={startdate}
        name="Start date"
        onChange={(value) => {
          setStartDate(value);
        }}
        error={errors.find((error) => error.field === "startdate")}
        placeholder="Enter your start date"
      />
      <fieldset className="address-fieldset">
        <legend>Address</legend>
        <LabelInput
          value={street}
          name="Street"
          onChange={(value) => {
            setStreet(value);
          }}
          error={errors.find((error) => error.field === "street")}
          placeholder="Enter your street"
        />
        <LabelInput
          value={city}
          name="City"
          onChange={(value) => {
            setCity(value);
          }}
          error={errors.find((error) => error.field === "city")}
          placeholder="Enter your city"
        />
        <LabelInput
          name="State"
          error={errors.find((error) => error.field === "state")}
          customInput={
            <Dropdown value={state} options={statesOptions} onChange={handleStateChange} className="form-dropdown" />
          }
        />
        <LabelInput
          value={zip}
          placeholder="Enter your zip code"
          name="Zip code"
          onChange={(value) => {
            setZip(value);
          }}
          error={errors.find((error) => error.field === "zipcode")}
        />
      </fieldset>
      <LabelInput
        name="Department"
        error={errors.find((error) => error.field === "department")}
        customInput={
          <Dropdown
            value={department}
            options={departmentOptions}
            onChange={handleDepartmentChange}
            className="form-dropdown"
          />
        }
      />

      <button type="submit" className="form-submit">
        Save
      </button>
    </form>
  );
}

export default CreateEmployee;
