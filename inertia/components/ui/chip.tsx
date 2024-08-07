import { PropsWithChildren } from "react";
import { cva } from "~/styled-system/css";
import { State } from "~/types";

export interface Props extends PropsWithChildren {
  type?: "button" | "submit" | "reset";
  variant?: State;
}

const chip = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: ".25rem",
    border: "2px solid #000",
    textStyle: "body",
    fontSize: ".85rem",
    padding: ".25rem .75rem",
    transition: "background",
    rounded: "999px",
    color: "black",
    whiteSpace: "nowrap",
    background: 'white'
  },
  variants: {},
});


export function Chip(props: Props) {
  const { variant, children } = props

  return (
    <span role="status" className={chip({ color: variant })}>
      {children}
    </span>
  );
};

export default Chip;
