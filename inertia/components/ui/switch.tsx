import * as SwitchPrimitive from '@radix-ui/react-switch'
import React from 'react'
import {  sva } from '~/styled-system/css'


const switchRecipe = sva({
  slots: ['root', 'thumb'],
  base: {
    root: {
      display: 'inline-flex',
      h: '24px',
      w: '44px',
      flexShrink: 0,
      cursor: 'pointer',
      alignItems: 'center',
      rounded: "999px",
      border: '2px solid black',
      transition: 'colors',

      _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
      },

      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.5',
      },

      '&[data-state=checked]': {
        bg: 'GrayText',
      },

      '&[data-state=unchecked]': {
        bg: 'ButtonFace',
      },
    },
    thumb: {
      pointerEvents: 'none',
      display: 'block',
      h: '5px',
      w: '5px',
      rounded: "999px",
      bg: 'black',
      shadow: 'lg',
      transition: 'transform',

      '&[data-state=checked]': {
        translateX: '5px',
      },

      '&[data-state=unchecked]': {
        translateX: '0px',
      },
    },
  },
})

const BaseSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => {
  const classes = switchRecipe()
 
  return (
    <SwitchPrimitive.Root className={classes.root} {...props} ref={ref}>
      <SwitchPrimitive.Thumb className={classes.thumb} />
    </SwitchPrimitive.Root>
  )
})

BaseSwitch.displayName = SwitchPrimitive.Root.displayName
export const Switch = BaseSwitch