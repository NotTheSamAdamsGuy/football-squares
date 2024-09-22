import { ChangeEvent } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  children?: React.ReactNode;
  id: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  size?: number;
  testId?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  label: string;
  errors: FieldErrors;
}

export default function Select({
  children,
  onChange,
  id,
  className,
  autocomplete,
  autofocus,
  disabled,
  form,
  multiple,
  size,
  testId = "select",
  required,
  register,
  label,
  errors,
}: Props) {
  const defaultClassName = "border-2 p-2";

  if (!className) {
    className = defaultClassName;
  } else {
    className = `${className} ${defaultClassName}`;
  }

  return (
    <>
      <label className="mt-6 first-of-type:mt-0" htmlFor={id}>
        {label}
      </label>
      <select
        {...register(id, { required: required })}
        id={id}
        className={className}
        onChange={onChange}
        autoComplete={autocomplete}
        autoFocus={autofocus}
        disabled={disabled}
        form={form}
        multiple={multiple}
        size={size}
        data-testid={testId}
        aria-invalid={errors[id] ? "true" : "false"}
      >
        {children}
      </select>
      
      {errors[id]?.type === "required" && (
        <p role="alert" className="pt-3 text-red-500">Please select a value for {label}</p>
      )}
    </>
  );
}
