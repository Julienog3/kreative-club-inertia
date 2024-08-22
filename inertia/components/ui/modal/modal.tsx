import { PropsWithChildren } from "react";
import { SpringValue, animated } from "@react-spring/web";
import { Button } from "../button";
import { createPortal } from "react-dom";
import CloseIcon from './../../../assets/icons/x-mark.svg?react'
import { center, hstack, vstack } from "~/styled-system/patterns";
import { css } from "~/styled-system/css";

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
  style: ModalStyle;
  onClose: () => void;
}

export type ModalStyle = {
  y: SpringValue<number>;
  opacity: SpringValue<number>;
};

export const modalTransitionConfig = {
  from: {
    y: 0,
    opacity: 0,
  },
  enter: {
    y: -10,
    opacity: 1,
  },
  leave: {
    y: 0,
    opacity: 0,
  },
  config: {
    duration: 200,
  },
};

export function Modal(props: Props) {
  const { title, description, style, onClose, children } = props

  return createPortal(
    <animated.div
      style={{ opacity: style.opacity }}
      className={center({
        zIndex: 50,
        w: "100%",
        minHeight: "screen",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "fixed",
        top: 0,
        left: 0,
      })}
    >
      <animated.div
        style={{ y: style.y }}
        role="dialog"
        className={css({
          border: "3px solid #000",
          boxShadow: "4px 4px 0px #000",
          borderRadius: "13px",
          bgColor: "#fff",
          padding: "1.5rem",
          minW: "600px",
          maxW: "1000px",
        })}
      >
        <header
          className={hstack({
            justifyContent: "space-between",
            alignItems: "center",
            mb: "1rem",
          })}
        >
          <div className={vstack({
            alignItems: "start",
            gap: ".25rem"
          })}>
            <h2 className={css({ textStyle: "h3" })}>{title}</h2>
            <p className={css({ textStyle: "body" })}>{description}</p>
          </div>
          <Button variant="danger" onClick={onClose}>
            <CloseIcon />
          </Button>
        </header>
        <div className={vstack({ alignItems: "start" })}>{children}</div>
      </animated.div>
    </animated.div>,
    document.body,
  );
};

