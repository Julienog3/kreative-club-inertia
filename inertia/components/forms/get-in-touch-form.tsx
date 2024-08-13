import { useForm } from "@tanstack/react-form"
import Input from "~/components/ui/input"
import { Button } from "../ui/button"
import { TextArea } from "../ui/textarea"
import { vstack } from "~/styled-system/patterns"
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from "zod"
import { RadioGroup } from "~/components/ui/radio-group"
import { Select } from "~/components/ui/select"
import { Category } from "~/types/category"
import { useMemo } from "react"
import { router, usePage } from "@inertiajs/react"
import { User } from "~/types"

interface Props {
  creativeId: string
  categories: Category[]
}

const delayList = [
  {
    label: 'Au plus vite !',
    value: 'asap'
  },
  {
    label: 'Dans le mois',
    value: 'in-the-month'
  },
  {
    label: 'Prenez votre temps',
    value: 'free'
  },
]

interface OrderRequestForm {
  type: string,
  delay: string,
  categories: never[],
  description: string,
}

export function GetInTouchForm(props: Props) {
  const { categories, creativeId } = props
   const { props: { user }} = usePage()

  async function createOrder(payload: OrderRequestForm): Promise<void> {
    const { categories, ...rest } = payload
    const categoriesIds = categories.map(({ value }) => value)

    await router.post('/orders', {
      sellerId: creativeId,
      customerId: (user as User).id,
      categories: categoriesIds,
      ...rest
    })
  }

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      type: '',
      delay: '',
      categories: [],
      description: ''
    },
    onSubmit: async ({ value }) => {
      await createOrder(value)
    }
  })

  const categoriesFormatted = useMemo(() => categories.map((category) => {
    return {
      label: category.title,
      value: category.id
    }
  }), [categories]) 

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }} 
      className={vstack({ alignItems: "start", gap: "1rem" })}>
      <form.Field
        name="type"
        children={(field) => (
          <Input 
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            label="Quel est la nature de votre projet ?"
            placeholder="ex : Logo, Landing page, etc"
          />
        )}
      />
      <form.Field 
        name="categories"
        children={(field) => (
          <Select 
            name={field.name} 
            label="Catégorie du besoin" 
            items={categoriesFormatted}
            value={field.state.value}
            onChange={(value) => field.handleChange(value)} 
            placeholder="Sélectionner une catégorie" 
          />
        )}
      />
      <form.Field 
        name="delay"
        children={(field) => (
          <RadioGroup
            name={field.name}
            label="Quels sont les délais du projet ?"
            elements={delayList}
            onChange={({ value }) => field.handleChange(value)}
            value={field.state.value}
          />
        )}
      />
      <form.Field 
        name="description"
        validators={{
          onChange: z.string().min(10, 'Minimum 10 caractères')
        }}
        children={(field) => (
          <TextArea 
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            label="Décrivez plus en détails votre projet "
            placeholder="Lorem ipsum dolores sit amet..."
            invalid={!!field.state.meta.errors[0]}
            errorMessage={field.state.meta.errors.join(', ')}
          />
        )}
      />
      <Button type="submit">Envoyer</Button>
    </form>
  )
}