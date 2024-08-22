import { Select as ArkSelect, Portal } from "@ark-ui/react"
import { sva } from "~/styled-system/css"
import CloseIcon from '~/assets/icons/x-mark.svg?react'

interface Props {
  name: string
  label: string
  items: Item[]
  value: Item[]
  onChange: (valueChanged: Item[]) => void
  placeholder?: string
  multiple?: boolean
}

type Item = { label: string; value: string; disabled?: boolean }

const selectRecipe = sva({
  slots: ['root', 'trigger', 'content', 'itemGroup', 'item'],
  base: {
    root: {
      textStyle: 'body'
    },
    trigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '.5rem',
      borderRadius: '5px',
      border: 'solid 2px black',
      p: '.5rem',
      bgColor: 'white',
      cursor: 'pointer'
    },
    content: {
      textStyle: 'body',
      borderRadius: '5px',
      border: 'solid 2px black',
      p: '.5rem',
      bgColor: 'white',
      cursor: 'pointer'
    },
    itemGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.25rem',
    },
    item: {
      display: 'flex',
      gap: '.5rem'
    }
  },
})

export function Select(props: Props) {
  const { items, label, name, onChange, placeholder = '' } = props

  const classes = selectRecipe()

  const defaultValue = props.value.map(({ value }) => `${value}`)
  console.log({ defaultValue })

  return (
    <ArkSelect.Root
      name={name} 
      className={classes.root} 
      items={items}
      onValueChange={(e) => onChange(e.items)}
      multiple={props.multiple}
      defaultValue={defaultValue}
    >
      <ArkSelect.Label>{label}</ArkSelect.Label>
      <ArkSelect.Control>
        <ArkSelect.Trigger className={classes.trigger}>
          <ArkSelect.ValueText placeholder={placeholder} />
          <ArkSelect.ClearTrigger><CloseIcon /></ArkSelect.ClearTrigger>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
       <Portal>
        <ArkSelect.Positioner>
          <ArkSelect.Content className={classes.content}>
            <ArkSelect.ItemGroup id={label} className={classes.itemGroup}>
              {items.map((item, index) => (
                <ArkSelect.Item key={index} item={item} className={classes.item}>
                  <ArkSelect.ItemIndicator>✓</ArkSelect.ItemIndicator>
                  <ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
                </ArkSelect.Item>
              ))}
            </ArkSelect.ItemGroup>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
    </ArkSelect.Root>
  )
}