import { SpringValue, animated, useTransition } from "@react-spring/web";
import { createPortal } from "react-dom";
import { css, sva } from "~/styled-system/css";
import { Button } from "../ui/button";
import { hstack, vstack } from "~/styled-system/patterns";
import CloseIcon from '~/assets/icons/x-mark.svg?react'
import { OrderRequest } from "~/types/order";

interface Props {
  orderRequest: OrderRequest
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

const orderRequestModalRecipe = sva({
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

export function OrderRequestModal(props: Props) {
  const { orderRequest, open, onCancel } = props

  const classes = orderRequestModalRecipe()

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
                <h2 className={css({ textStyle: "h4" })}>Demande de projet</h2>
                <Button variant="danger" onClick={onCancel}>
                  <CloseIcon />
                </Button>
              </header>
              <section className={vstack({ alignItems: "start", mb: "1rem", textStyle: "body" })}>
                <div className={vstack({ alignItems: "start", gap: "0" })}>
                  <label className={css({ fontWeight: "bold" })}>Nature du projet</label>
                  <p>{orderRequest.type}</p>
                </div>
                <div className={vstack({ alignItems: "start", gap: "0" })}>
                  <label className={css({ fontWeight: "bold" })}>Catégories</label>
                  <p>{orderRequest.categories.map(({ title }) => title).join(', ')}</p>
                </div>
                <div className={vstack({ alignItems: "start", gap: "0" })}>
                  <label className={css({ fontWeight: "bold" })}>Description</label>
                  <p>{orderRequest.description}</p>
                </div>
                <div className={vstack({ alignItems: "start", gap: "0" })}>
                  <label className={css({ fontWeight: "bold" })}>Délai</label>
                  <p>{orderRequest.delay}</p>
                </div>
              </section>
            </animated.div>
          </animated.div>}
        </>
      ))}
    </>,
    document.body,
  );
};