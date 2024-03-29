import React, { ReactNode } from 'react'
import { cva } from '~/styled-system/css'

export type State = 'danger' | 'success' | 'warning'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: State
  children: ReactNode
}

const button = cva({
  base: {
    display: 'flex',
    border: '2px solid #000',
    cursor: 'pointer',
    textStyle: 'body',
    padding: '.5rem',
    transition: 'background',
    rounded: '.5rem',
    color: 'black',
    alignItems: 'center',
    gap: '.5rem',
  },
  variants: {
    size: {
      small: {},
      medium: {},
      large: {},
    },
    color: {
      primary: {
        backgroundColor: 'purple',
      },
      danger: {
        backgroundColor: 'danger',
        _hover: {
          backgroundColor: 'darkred',
        },
      },
      success: {
        backgroundColor: 'success',
      },
      warning: {
        backgroundColor: 'warning',
      },
    },
    disabled: {
      true: {
        backgroundColor: 'disabled',
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

export function Button({ type = 'button', disabled = false, variant, onClick, children }: Props) {
  return (
    <button
      role="button"
      className={button({ color: variant, disabled })}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
