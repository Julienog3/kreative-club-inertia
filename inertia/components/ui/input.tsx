import React from "react";
import { css, sva } from "~/styled-system/css";
import { SystemStyleObject } from "~/styled-system/types";

interface Props extends React.HTMLProps<HTMLInputElement>  {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean;
  errorMessage?: string
  rootProps?: SystemStyleObject;
  controlProps?: SystemStyleObject;
  labelProps?: SystemStyleObject;
}

const inputRecipe = sva({
  slots: ['root', 'control', 'label'],
  base: {
    root: { display: 'flex', flexDir: 'column', gap: '.5rem', textStyle: 'body' },
    control: { padding: '.65rem', border: '#000 solid 2px', borderRadius: '5px' },
    label: {}
  }
})

const Input = (props: Props): JSX.Element => {
  const { type, required, label, errorMessage, value, onChange,rootProps, labelProps, controlProps, ...rest } = props
  
  const styles = inputRecipe.raw()

  return (
    <div className={css(styles.root, rootProps)}>
      {label && <label className={css(styles.label, labelProps)}>
        {label}
        {required && (
          <span className={css({ color: "purple", ml: ".25rem" })}>*</span>
        )}
      </label>}
      <input
        className={css(styles.control, controlProps)}
        autoComplete={type === "password" ? "new-password" : ""}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {errorMessage && (
        <p
          role="alert"
          className={css({ textStyle: "body", color: "red" })}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
