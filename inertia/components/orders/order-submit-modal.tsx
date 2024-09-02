import { SpringValue, animated, useTransition } from "@react-spring/web";
import { createPortal } from "react-dom";
import { css, sva } from "~/styled-system/css";
import { Button } from "../ui/button";
import { hstack, vstack } from "~/styled-system/patterns";
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

const orderSubmitModalRecipe = sva({
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

export function OrderSubmitModal(props: Props) {
  const { order, open, onCancel } = props

  const classes = orderSubmitModalRecipe()

  const modalTransition = useTransition(open, modalTransitionConfig);

  const form = useForm({
    defaultValues: {
      files: []
    },
    onSubmit: async ({ value }) => {
      router.post(`/orders/${order.id}/files`, value, {
        onSuccess: () => {
          console.log('cool')
        },
        forceFormData: true
      })
    }
  })

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
                <h2 className={css({ textStyle: "h3" })}>Envoi des fichiers</h2>
                <Button variant="danger" onClick={onCancel}>
                  <CloseIcon />
                </Button>
              </header>
              <section className={vstack({ alignItems: "start", mb: "1rem", textStyle: "body" })}>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                  }}
                  className={vstack({ alignItems: "start", width: "100%" })}
                >
                  <form.Field 
                    name="files"
                    children={(field) => (
                      <Dropzone 
                        name={field.name}
                        label="Fichiers"
                        maxFiles={10}
                        // value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.files)}
                        // errorMessage={field.state.meta.errors.join(', ')} 
                      />
                    )}
                  />
                  <form.Subscribe
                    selector={(state) => [state.isFormValid]}
                    children={([isFormValid]) => (
                      <Button disabled={!isFormValid} type="submit">Envoyer</Button>
                    )}
                  />
                </form>
              </section>
            </animated.div>
          </animated.div>}
        </>
      ))}
    </>,
    document.body,
  );
};