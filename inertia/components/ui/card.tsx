import React from "react";
import { SystemStyleObject } from "@pandacss/dev";
import { css, cva } from "~/styled-system/css";


const card = cva({
  base: {
    layerStyle: "container",
    overflow: "hidden",
    // transition: "all .5s",
    // _hover: {
    //   boxShadow: "5px 5px 0px black",
    // },
  },
  variants: {
    shadow: {
      true: {
        boxShadow: "4px 4px 0px black",
      },
    },
  },
});


interface CardProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  withShadow?: boolean;
  css?: SystemStyleObject;
  children: React.ReactNode;
}

const Card = (props: CardProps): JSX.Element => {
  const { withShadow = false, css: cssProp = {}, children } = props;

  const className = css(card.raw({ shadow: withShadow }), cssProp);

  return (
    <article className={className} {...props}>
      {children}
    </article>
  );
};

export default Card;
