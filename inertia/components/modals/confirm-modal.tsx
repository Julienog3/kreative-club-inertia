import { SpringValue, animated, useTransition } from "@react-spring/web";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { css, sva } from "~/styled-system/css";
import { Button } from "../ui/button";
import { hstack, vstack } from "~/styled-system/patterns";
import CloseIcon from '~/assets/icons/x-mark.svg?react'

interface Props extends PropsWithChildren {
  title?: string;
  description?: string
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
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

const confirmModalRecipe = sva({
  slots: ['backdrop', 'root'],
  base: {
    backdrop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      w: '100%',
      minHeight: 'screen',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      position: 'fixed',
      top: 0,
      left: 0,
    },
    root: {
      border: '3px solid #000',
      boxShadow: '4px 4px 0px #000',
      borderRadius: '13px',
      bgColor: '#fff',
      padding: '1.5rem',
      minW: '500px',
      maxW: '1000px',
    }
  }
})

export function ConfirmModal(props: Props) {
  const { title, description, open, onCancel, onConfirm } = props

  const classes = confirmModalRecipe()

  const modalTransition = useTransition(open, modalTransitionConfig);

  return createPortal(
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && <animated.div
            style={{ opacity: style.opacity }}
            className={classes.backdrop}
          >
            <animated.div
              style={{ y: style.y }}
              role="dialog"
              className={classes.root}
            >
              <header
                className={hstack({
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: "1rem",
                })}
              >
                <h2 className={css({ textStyle: "h4" })}>{title ?? 'Voulez vous confirmer ?'}</h2>
                <Button variant="danger" onClick={onCancel}>
                  <CloseIcon />
                </Button>
              </header>
              <section className={vstack({ alignItems: "start", mb: "1rem", textStyle: "body" })}>
                <p>{description}</p>
              </section>
              <footer className={hstack()}>
                <Button variant="danger" onClick={onConfirm}>Confirmer</Button>
                <Button onClick={onCancel}>Annuler</Button>
              </footer>
            </animated.div>
          </animated.div>}
        </>
      ))}
    </>,
    document.body,
  );
};