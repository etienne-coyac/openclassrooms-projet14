import { useState } from "react";
import LabelInput from "../components/LabelInput";
import "../style/createEmployee.scss";
function CreateEmployee() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  return (
    <form className="employee-form">
      <LabelInput
        value={firstName}
        name="Firstname"
        onChange={(value) => {
          setFirstName(value);
        }}
      />
      <LabelInput
        value={lastName}
        name="Lastname"
        onChange={(value) => {
          setLastName(value);
        }}
      />
      <LabelInput
        value={birthDate}
        name="Birthdate"
        onChange={(value) => {
          setBirthDate(value);
        }}
      />
      <LabelInput
        value={startDate}
        name="Start date"
        onChange={(value) => {
          setStartDate(value);
        }}
      />
      <fieldset>
        <legend>Address</legend>
      </fieldset>
    </form>
  );
}

export default CreateEmployee;
