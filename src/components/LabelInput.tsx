import "../style/labelInput.scss";
import { ErrorType } from "../types/employee.types";

type LabelInputProps = {
  name: string;
  error?: ErrorType;
  placeholder?: string;
} & (
  | {
      customInput: JSX.Element;
      value?: never;
      onChange?: never;
    }
  | {
      customInput?: never;
      value: string;
      onChange: (value: string) => void;
    }
);

function LabelInput(props: LabelInputProps) {
  const { value, name, onChange, customInput, error, placeholder } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      {customInput ? (
        customInput
      ) : (
        <>
          <input
            type="text"
            className={`form-input ${props.error ? "error" : ""}`}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
          {error && <p className="form-input-error-tip">{error.message}</p>}
        </>
      )}
    </div>
  );
}

export default LabelInput;
