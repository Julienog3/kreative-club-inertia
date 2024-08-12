import React from "react";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { Field as ArkField } from "@ark-ui/react"

interface Props extends React.HTMLProps<HTMLTextAreaElement>  {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean;
  invalid?: boolean
  errorMessage?: string
}

export function TextArea(props: Props) {
  const { label, required, value, onChange, errorMessage, invalid,...rest } = props  

  return (
    <ArkField.Root invalid={invalid} className={vstack({ gap: 1, alignItems: "left" })}>
      <ArkField.Label className={css({ textStyle: "body" })}>
        {label}
      </ArkField.Label>
      <ArkField.Textarea
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
      <ArkField.ErrorText className={css({ textStyle: "body", color: "red" })}>
        {errorMessage}
      </ArkField.ErrorText>
    </ArkField.Root>
  );
}