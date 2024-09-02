import { router } from "@inertiajs/react"
import { useForm } from "@tanstack/react-form"
import { hstack } from "~/styled-system/patterns"
import { Select } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import Input from "../ui/input"
import { Category } from "~/types/category"

interface Props {
  categories: Category[]
}

export function CreativesFilterForm(props: Props) {
  const { categories } = props

  const sortTypes = [
    { label: 'Ordre alphabétique', value: 'username.asc' },
    { label: 'Les plus récents', value: 'created_at.desc'}
  ]

  const form = useForm({
    defaultValues: {
      sortBy: [],
      categories: [],
      username: ''
    },
    onSubmit: async ({ value }) => {
      const newUrl = new URL('/creatives', window.document.location.origin)

      console.log({ value })
      
      if (value.sortBy.length >= 1) {
        // @ts-expect-error
        const [sort, order] = value.sortBy[0].value.split('.')
        
        if (sort) {
          newUrl.searchParams.append('sort', sort);
        }
  
        if (order) {
          newUrl.searchParams.append('order', order);
        }
      }

      if (value.username) {
        newUrl.searchParams.append('username', value.username);
      }

      router.visit(newUrl, { only: ['creatives'], preserveScroll: true })
    } 
  })

  function formatCategories(c: Category[]) {
    return c.map(category => ({
      label: category.title,
      value: category.id?.toString() 
    }))
  }

  return (
    <form 
      onSubmit={(e) => { 
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={hstack({ alignItems: 'end' })}
    >
      <form.Field name="sortBy" children={(field) => (
        <Select 
          name={field.name} 
          items={sortTypes}
          value={field.state.value}
          onChange={(value) => field.handleChange(value)} 
          label="Trier par" 
          placeholder="Choisir l'ordre de tri" 
        />
      )} />
      <form.Field 
        name="categories"
        children={(field) => (
          <Select 
            multiple
            name={field.name} 
            label="Filtrer par" 
            items={formatCategories(categories)}
            value={formatCategories(field.state.value || []) }
            onChange={(value) => field.handleChange(value)} 
            placeholder="Sélectionner une catégorie" 
          />
        )}
      />
      <form.Field 
        name="username"
        children={(field) => (
          <Input 
            name={field.name}
            value={field.state.value}
            label="Rechercher un créatif"
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="ex: john.doe48"
          />
        )}
      />
      <Button type="submit">Trier</Button>
    </form>
  )
}