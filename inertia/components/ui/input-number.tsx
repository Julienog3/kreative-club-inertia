import { NumberInput as ArkNumberInput, NumberInputValueChangeDetails } from '@ark-ui/react'
import { sva } from '~/styled-system/css'
import { hstack } from '~/styled-system/patterns'

interface Props {
  label: string
  name: string
  value: number
  onChange: (details: NumberInputValueChangeDetails) => void
  formatOptions?: Intl.NumberFormatOptions
}

const numberInputRecipe = sva({
  slots: ['root', 'input', 'control'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      textStyle: 'body',
    },
    input: {
      p: ".65rem",
    },
    control: {
      display: 'flex',
      flexDirection: 'column',
      borderLeft: "solid 2px black",
      px: ".25rem",
    }
  }
})

export const NumberInput = (props: Props) => {
  const { label, name, value, onChange, formatOptions } = props
  const classes = numberInputRecipe()

  return (
    <ArkNumberInput.Root 
      name={name} 
      className={classes.root} 
      onValueChange={onChange}
      value={value.toString()}
      formatOptions={formatOptions}
    >
      <ArkNumberInput.Label>{label}</ArkNumberInput.Label>
      <div className={hstack({ 
        border: "solid black 2px",
        width: "fit-content" ,
        borderRadius: "5px"
      })}>
        <ArkNumberInput.Input className={classes.input} />
        <ArkNumberInput.Control className={classes.control}>
          <ArkNumberInput.DecrementTrigger>-</ArkNumberInput.DecrementTrigger>
          <ArkNumberInput.IncrementTrigger>+</ArkNumberInput.IncrementTrigger>
        </ArkNumberInput.Control>
      </div>
    </ArkNumberInput.Root>
  )
}