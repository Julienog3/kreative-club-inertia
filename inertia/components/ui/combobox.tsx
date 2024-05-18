import { Combobox as ArkCombobox, Portal as ArkPortal, ComboboxValueChangeDetails } from '@ark-ui/react'
import { sva } from '~/styled-system/css'

const comboboxRecipe = sva({
  slots: ['root', 'input', 'content'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      textStyle: 'body',
      gap: '.5rem',
      _focusVisible: {
        outline: '2px solid transparent',
        outlineOffset: '2px',
      },

      _disabled: {
        cursor: 'not-allowed',
        opacity: '0.5',
      },
    },
    input: {
      padding: ".5rem",
      border: "black solid 2px",
      rounded: ".5rem",
      textStyle: "body",
    },
    content: {
      padding: ".5rem",
      border: "black solid 2px",
      rounded: ".5rem",
      textStyle: "body",
      bg: "white"
    }
  },
})

interface Props {
  label: string
  name: string
  items: { label: string; value: string; disabled?: boolean }[]
  value: string[]
  onValueChange: (details: ComboboxValueChangeDetails<string[]>) => void
}

const BaseCombobox = (props: Props) => {
  const classes = comboboxRecipe()
  const { label, name, value, onValueChange } = props

  const items = [
    { label: 'React', value: 'react' },
    { label: 'Solid', value: 'solid' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte', disabled: true },
  ]

  // const itemFiltered 

  return (
    <ArkCombobox.Root 
      items={items} 
      lazyMount 
      unmountOnExit 
      multiple 
      className={classes.root}
      value={value}
      onValueChange={onValueChange}
      
    >
      <ArkCombobox.Label>{label}</ArkCombobox.Label>
      <ArkCombobox.Control>
        <ArkCombobox.Input className={classes.input}/>
        <ArkCombobox.Trigger>Open</ArkCombobox.Trigger>
        <ArkCombobox.ClearTrigger>Clear</ArkCombobox.ClearTrigger>
      </ArkCombobox.Control>
      <ArkPortal>
        <ArkCombobox.Positioner>
          <ArkCombobox.Content className={classes.content}>
            <ArkCombobox.ItemGroup id={name}>
              <ArkCombobox.ItemGroupLabel htmlFor={name}>{label}</ArkCombobox.ItemGroupLabel>
              {items.map((item) => (
                <ArkCombobox.Item key={item.value} item={item}>
                  <ArkCombobox.ItemText>{item.label}</ArkCombobox.ItemText>
                  <ArkCombobox.ItemIndicator>✓</ArkCombobox.ItemIndicator>
                </ArkCombobox.Item>
              ))}
            </ArkCombobox.ItemGroup>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </ArkPortal>
    </ArkCombobox.Root>
  )
}

BaseCombobox.displayName = 'Combobox'
export const Combobox = BaseCombobox