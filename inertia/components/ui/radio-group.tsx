import { RadioGroup as ArkRadioGroup, type RadioGroupValueChangeDetails } from '@ark-ui/react'
import { sva } from '~/styled-system/css';
import { hstack } from '~/styled-system/patterns';

type Item = { label: string; value: string; disabled?: boolean }

interface Props {
  name: string
  value: string
  label: string
  elements: Item[]
  disabled?: boolean
  onChange: (newValue: RadioGroupValueChangeDetails) => void
}

const radioGroupRecipe = sva({
  slots: ['root', 'item'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '.5rem',
      textStyle: 'body'
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: ".25rem",
      border: "2px solid #000",
      textStyle: "body",
      fontSize: ".85rem",
      padding: ".25rem .75rem",
      transition: "background",
      rounded: "999px",
      color: "black",
      whiteSpace: "nowrap",
      background: 'white',
      cursor: 'pointer',
      _checked: { bg: 'purple' }
    }
  },
})

export const RadioGroup = (props: Props) => {
  const classes = radioGroupRecipe()
  
  return (
    <ArkRadioGroup.Root
      name={props.name}
      disabled={props.disabled}
      onValueChange={(details) => props.onChange(details)} 
      value={props.value}
      className={classes.root}
    >
      <ArkRadioGroup.Label>{props.label}</ArkRadioGroup.Label>
      <div className={hstack()}>
        {props.elements.map((element) => (
          <ArkRadioGroup.Item key={element.value} value={element.value} className={classes.item}>
            <ArkRadioGroup.ItemText>{element.label}</ArkRadioGroup.ItemText>
            <ArkRadioGroup.ItemControl />
            <ArkRadioGroup.ItemHiddenInput />
          </ArkRadioGroup.Item>
        ))}
      </div>
    </ArkRadioGroup.Root>
  )
}