import React, { ReactNode } from 'react'
import { cva } from '~/styled-system/css'

export type State = 'danger' | 'success' | 'warning' | 'ghost'
type Size = 'small' | 'medium' | 'large'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: State
  size?: Size
  children: ReactNode
}

const button = cva({
  base: {
    display: 'flex',
    border: '2px solid #000',
    cursor: 'pointer',
    textStyle: 'body',
    padding: '.65rem',
    transition: 'background',
    justifyContent: 'center',
    rounded: '5px',
    color: 'black',
    alignItems: 'center',
    gap: '.5rem',
  },
  variants: {
    size: {
      small: {},
      medium: {},
      large: {
        padding: '1rem',
      },
    },
    color: {
      primary: {
        backgroundColor: 'purple',
      },
      ghost: {
        backgroundColor: 'white'
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

export function Button(props: Props) {
  const { type = 'button', disabled = false, variant, onClick, children, size } = props

   return (
    <button
      role="button"
      className={button({ color: variant, size,  disabled })}
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
