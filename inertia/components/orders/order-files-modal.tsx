import { SpringValue, animated, useTransition } from "@react-spring/web";
import { createPortal } from "react-dom";
import { css, sva } from "~/styled-system/css";
import { Button } from "../ui/button";
import { grid, hstack, vstack } from "~/styled-system/patterns";
import CloseIcon from '~/assets/icons/x-mark.svg?react'
import { Order } from "~/types/order";
import { useForm } from "@tanstack/react-form";
import { Dropzone } from "../ui/dropzone";
import { router } from "@inertiajs/react";

interface Props {
  order: Order
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

const orderFilesModalRecipe = sva({
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
      minW: '700px',
      maxW: '1000px',
    }
  }
})

export function OrderFilesModal(props: Props) {
  const { order, open, onCancel } = props

  const classes = orderFilesModalRecipe()

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
                <div className={vstack({ alignItems: "start" })}>
                  <h2 className={css({ textStyle: "h3" })}>Les réalisations</h2>
                  <p className={css({ textStyle: "body" })}>L'ensemble des réalisations de votre commande.</p>
                </div>
                <Button variant="danger" onClick={onCancel}>
                  <CloseIcon />
                </Button>
              </header>
              <section className={vstack({ alignItems: "start", mb: "1rem", textStyle: "body" })}>
                {order.files && order.files.length >= 1 ? <ul className={css({
                  display: "grid",
                  gridTemplateColumns: 1,
                  md: { gridTemplateColumns: 2 },
                  lg: { gridTemplateColumns: 3 },
                  gap: "1rem",
                  width: "100%"
                })}
                >
                  {order.files.map((file) => (
                    <li className={css({ w: "100%", objectFit: "cover", border: "2px solid black", borderRadius: "10px" })}>
                      <a href={file.file} download={file.id}>
                        <img src={file.file} />
                      </a>
                    </li>
                  ))}
                </ul> : <span className={css({ textStyle: "body" })}>Aucun fichier n'a été envoyés</span>}
              </section>
            </animated.div>
          </animated.div>}
        </>
      ))}
    </>,
    document.body,
  );
};