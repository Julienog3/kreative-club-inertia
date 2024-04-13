import { Tooltip as ArkTooltip } from '@ark-ui/react'
import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  label: string
}

export const Tooltip = (props: Props) => {
  const { children, label } = props
  return (
    <ArkTooltip.Root>
      <ArkTooltip.Trigger>{children}</ArkTooltip.Trigger>
      <ArkTooltip.Positioner>
        <ArkTooltip.Content>{label}</ArkTooltip.Content>
      </ArkTooltip.Positioner>
    </ArkTooltip.Root>
  )
}
