import { useState } from "react";
import { Option } from "../types/dropdown.types";
import "../style/dropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
interface DropdownProps<T> {
  title?: string;
  value: Option<T> | null;
  options: Option<T>[];
  onChange: (value: Option<T>) => void;
  className?: string;
  error?: boolean;
}

function Dropdown<T>(props: DropdownProps<T>) {
  const { title, value, options, onChange, className, error } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (option: Option<T>) => {
    onChange(option);
    setOpen(false);
  };

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className={`${className} ${error ? "error" : ""} dropdown-default`}>
      <button type="button" onClick={handleOpenDropdown}>
        <span className="dropdown-value">{value?.label}</span>
        <span>{value === null ? title : ""}</span>
        <FontAwesomeIcon
          className={`dropdown-icon ${open ? "open" : ""}`}
          icon={faChevronDown}
        />
      </button>
      <ul className={`dropdown-list ${open ? "open" : ""}`}>
        {options.map((option, index) => {
          return (
            <li
              className="dropdown-item"
              key={index}
              onClick={() => {
                handleChange(option);
              }}
            >
              {option.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
