import { router, usePage } from "@inertiajs/react"
import { useForm } from "@tanstack/react-form"
import { Select } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import { hstack } from "~/styled-system/patterns"

export function BookmarksFilterForm() {
  const { component } = usePage()

  const sortTypes = [
    { label: 'Ordre alphabétique', value: 'username.asc' },
    { label: 'Date d\'ajout', value: 'created_at.desc'}
  ]

  const form = useForm({
    defaultValues: {
      sortBy: []
    },
    onSubmit: async ({ value }) => {
      // @ts-expect-error
      const [sort, order] = value.sortBy[0].value.split('.')

      const newUrl = new URL(component, window.document.location.origin)
      newUrl.searchParams.append('sort', sort);
      newUrl.searchParams.append('order', order);

      router.visit(newUrl, { only: ['bookmarks'] })
    } 
  })

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
      <Button type="submit">Trier</Button>
    </form>
  )
}