import React from "react";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";

interface Props  {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean;
  errorMessage?: string
}

const Input = (props: Props): JSX.Element => {
  const { type, required, label, errorMessage, value, onChange } = props

  return (
    <div className={vstack({ gap: 1, alignItems: "left" })}>
      <label className={css({ textStyle: "body" })}>
        {label}
        {required && (
          <span className={css({ color: "purple", ml: ".25rem" })}>*</span>
        )}
      </label>
      <input
        className={css({
          padding: ".5rem",
          border: "#000 solid 2px",
          rounded: ".5rem",
          textStyle: "body",
        })}
        autoComplete={type === "password" ? "new-password" : ""}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
      {errorMessage && (
        <p
          role="alert"
          className={css({ textStyle: "body", color: "red.400" })}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
