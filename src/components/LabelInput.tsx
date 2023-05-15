import "../style/labelInput.scss";

interface LabelInputProps {
  value: string;
  name: string;
  onChange: (value: string) => void;
}

function LabelInput(props: LabelInputProps) {
  const { value, name, onChange } = props;
  return (
    <div className="form-group">
      <label htmlFor="name">{name}</label>
      <input type="text" className="form-input" value={value} name={name} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default LabelInput;
