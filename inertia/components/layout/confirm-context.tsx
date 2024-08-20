import { ComponentProps, createContext, PropsWithChildren, useCallback, useContext, useRef, useState,  } from "react";
import { ConfirmModal } from "~/components/modals/confirm-modal";

type Params = Partial<
  Omit<ComponentProps<typeof ConfirmModal>, 'open' | 'onCancel' | 'onConfirm'>
>

const defaultFunction = (p?: Params) => Promise.resolve(true)

const defaultValue = {
  confirmRef: {
    current: defaultFunction
  }
}

const ConfirmContext = createContext(defaultValue)

export function ConfirmContextProvider({ children }: PropsWithChildren) {
  const confirmRef = useRef(defaultFunction)
  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}
      <ConfirmModalWithContext />
    </ConfirmContext.Provider>
  )
}

function ConfirmModalWithContext() {
  const [open, setOpen] = useState<boolean>(false)
  const [props, setProps] = useState<undefined | Params>()
  const resolveRef = useRef((v: boolean) => {})
  const { confirmRef } = useContext(ConfirmContext)
  confirmRef.current = (props) => (
    new Promise((resolve) => {
      setProps(props)
      setOpen(true)
      resolveRef.current = resolve
    })
  )

  return (
    <ConfirmModal 
      open={open} 
      onConfirm={() => {
        resolveRef.current(true)
        setOpen(false)
      }} 
      onCancel={() => {
        resolveRef.current(false)
        setOpen(false)
      }} 
      {...props}
    >
      {props?.children}
    </ConfirmModal>
  )
}

export function useConfirm() {
  const { confirmRef } = useContext(ConfirmContext) 
  
  return {
    confirm: useCallback((p: Params) => {
      return confirmRef.current(p)
    }, [confirmRef])
  }
}