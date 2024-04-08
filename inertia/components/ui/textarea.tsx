import React from "react";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";

interface Props extends React.HTMLProps<HTMLTextAreaElement>  {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean;
  errorMessage?: string
}

export function TextArea(props: Props) {
  const { label, required, value, onChange, errorMessage, ...rest } = props

  

  return (
    <div className={vstack({ gap: 1, alignItems: "left" })}>
      <label className={css({ textStyle: "body" })}>
        {label}
        {required && (
          <span className={css({ color: "purple", ml: ".25rem" })}>*</span>
        )}
      </label>
      <textarea
        className={css({
          padding: ".5rem",
          border: "#000 solid 2px",
          rounded: ".5rem",
          textStyle: "body",
        })}
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
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
}