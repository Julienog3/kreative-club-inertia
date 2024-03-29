import { SpringValue, animated, useSpring } from "@react-spring/web";
import { useCallback, useEffect } from "react";
import { useSnackbarStore } from "./snackbar.store";
import { State } from "types";
import { center, hstack, vstack } from "~/styled-system/patterns";
import { css } from "~/styled-system/css";
import XMark from "~/assets/icons/x-mark.svg?react"
import MinusCircle from "~/assets/icons/minus-circle.svg?react"
import ExclamationTriangle from "~/assets/icons/exclamation-triangle.svg?react"
import CheckCircle from "~/assets/icons/check-circle.svg?react"

type SnackbarItemStyle = {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
};

interface SnackbarItem {
  style: SnackbarItemStyle;
  id: string;
  type: State;
  message: string;
}

const DURATION = 4000;

const SnackbarItem = ({
  style,
  id,
  type,
  message,
}: SnackbarItem): JSX.Element => {
  const removeItem = useSnackbarStore(({ removeItem }) => removeItem);

  const onClose = useCallback((id: string) => {
    removeItem(id);
  }, []);

  const icons = {
    danger: <MinusCircle />,
    warning: <ExclamationTriangle />,
    success: <CheckCircle />,
  };

  const props: { width: SpringValue } = useSpring({
    from: { width: 0 },
    to: { width: 100 },
    config: {
      duration: DURATION,
    },
  });

  useEffect(() => {
    const selfDeleteTimeout = setTimeout(() => {
      onClose(id);
    }, DURATION);

    return () => {
      clearTimeout(selfDeleteTimeout);
    };
  }, []);

  return (
    <animated.li
      style={style}
      className={vstack({
        gap: 0,
        layerStyle: "container",
        alignItems: "center",
        overflow: "hidden",
      })}
      key={id}
    >
      <div
        className={hstack({
          padding: "1rem",
          borderBottom: "solid 2px black",
        })}
      >
        <div
          className={center({
            backgroundColor: type,
            width: "2rem",
            height: "2rem",
            border: "2px solid black",
            rounded: ".5rem",
          })}
        >
          {icons[type]}
        </div>
        <p className={css({ textStyle: "body" })}>{message}</p>
        <button
          className={css({
            padding: ".5rem",
            cursor: "pointer",
            rounded: "5px",
            transition: "background",
            _hover: {
              backgroundColor: "gray",
            },
          })}
          onClick={(): void => onClose(id)}
        >
          <XMark />
        </button>
      </div>
      <animated.span
        style={{ width: props.width.to((value) => `${value}%`) }}
        className={css({
          h: ".5rem",
          backgroundColor: type,
          alignSelf: "start",
          borderRight: "2px solid black",
        })}
      ></animated.span>
    </animated.li>
  );
};

export default SnackbarItem;
