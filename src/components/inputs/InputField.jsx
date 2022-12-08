import { Form } from "react-bootstrap";
function InputField({
  controlId,
  name,
  errors,
  touched,
  handleChange,
  handleBlur,
  value,
  label,
  type,
  className,
  singleLine,
}) {
  return (
    <Form.Group controlId={controlId} className={className}>
      {" "}
      <div
        className={`${
          singleLine && "d-flex align-items-center justify-content-between"
        }`}
      >
        {" "}
        <Form.Label className={`label ${singleLine && "mb-0"}`}>
          {" "}
          {label}{" "}
        </Form.Label>{" "}
        <Form.Control
          name={name}
          className={` ${singleLine && "w-50"} ${
            errors && touched ? "not-valid" : "valid"
          } ${className === "message-box" ? "message-box" : "input"} `}
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          type={`${type ? type : "text"}`}
        />{" "}
      </div>{" "}
      {touched && errors && (
        <p className={`mt-2 text-red text mb-0 ${singleLine && "text-end"}`}>
          {" "}
          {errors}{" "}
        </p>
      )}{" "}
    </Form.Group>
  );
}
export default InputField;
