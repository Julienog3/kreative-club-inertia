import { Tooltip as ArkTooltip } from '@ark-ui/react'
import { PropsWithChildren } from 'react'
import { sva } from '~/styled-system/css'

interface Props extends PropsWithChildren {
  label: string
}

const tooltipRecipe = sva({
  slots: ['root', 'positioner', 'content'],
  base: {
    content: {
      backgroundColor: 'white',
      borderRadius: '5px',
      border: 'solid 2px black',
      textStyle: 'body',
      p: '.5rem'
    }
  }
})

export const Tooltip = (props: Props) => {
  const { children, label } = props
  const classes = tooltipRecipe()
  
  return (
    <ArkTooltip.Root 
      positioning={{
        placement: 'left-start',
        offset: { mainAxis: 12, crossAxis: 12 },
      }}
    >
      <ArkTooltip.Trigger>{children}</ArkTooltip.Trigger>
      <ArkTooltip.Positioner >
        <ArkTooltip.Content className={classes.content}>{label}</ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Root>
  )
}
