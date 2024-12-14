import React from "react";
import styles from "./Input.module.css";

type InputProps = {
  type: string;
  name: string;
  value: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  checked?: boolean;
  pattern?: string;
  active?: string;
  cost?: string;
};

function Input({
  type,
  name,
  value,
  onChange,
  label = "",
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  maxLength,
  pattern,
  checked,
  active = "",
  cost = "",
}: InputProps): JSX.Element {
  const inputClasses = `${styles.input_field} ${
    error ? styles.error_field : ""
    }`;
  
  const containerClasses = `${styles.input_container} ${
    active ? styles[active] : ""
  } ${error ? styles.input_error : ""} ${styles[type]}`;

  return (
    <div className={containerClasses}>
      {label && (
        <span>
          <label htmlFor={name}>{label}</label>
          <p className={styles.checkbox_description}>
            Access to multiplayer game
          </p>
        </span>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        pattern={pattern}
        checked={checked}
        id={name}
        className={inputClasses}
      />

      {cost && <p className={styles.add_ons_price}>+${cost}</p>}

      {error && <span className={styles.error_message}>{error}</span>}
    </div>
  );
}

export default Input;
