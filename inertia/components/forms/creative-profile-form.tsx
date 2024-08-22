import { router, usePage } from "@inertiajs/react";
import { hstack, vstack } from "~/styled-system/patterns";
import { Button } from "../ui/button";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { TextArea } from "../ui/textarea";
import { Category } from "~/types/category";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Select } from "../ui/select";
import { User } from "~/types";

interface Props {
  creative: User,
  categories: Category[]
}

export function CreativeProfileForm(props: Props) {
  const { categories, creative } = props
  const { addItem } = useSnackbarStore(store => store)  

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      description: creative.description,
      categories: creative.categories
    },
    onSubmit: async ({ value }) => {
      await saveChanges(value)
    }
  })

  async function saveChanges(value: any) {
    await router.put(`/users/${creative.id}`, {
      ...value,
      categories: value.categories.map(({ value }) => value)
    }, 
    {
      onSuccess: () => {
        addItem({ type: "success", message: "Votre profil a été correctement modifié."})
        router.reload({ only: ['user'] })
      },
      onError: () => {
        addItem({ type: "danger", message: "Votre profil n'a pas été modifié." })
      }
    })    
  }

  function formatCategories(c: Category[]) {
    return c.map(category => ({
      label: category.title,
      value: category.id?.toString() 
    }))
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={vstack({ alignItems: "start", w: "100%" })}
    >
      <form.Field 
        name="description"
        children={(field) => (
          <TextArea 
            type="text"
            name={field.name}
            label="Description"
            value={field.state.value}
            onChange={e => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.join(', ')} 
            placeholder="10 mots minimum..."
          />
        )}
      />
      <form.Field 
        name="categories"
        children={(field) => (
          <Select 
            multiple
            name={field.name} 
            label="Catégorie du besoin" 
            items={formatCategories(categories)}
            value={formatCategories(field.state.value || []) }
            onChange={(value) => field.handleChange(value)} 
            placeholder="Sélectionner une catégorie" 
          />
        )}
      />
      <form.Subscribe
        selector={(state) => [state.isDirty]}
        children={([isDirty]) => (
          <div className={hstack()}>
            <Button type="submit" disabled={!isDirty}>Enregistrer</Button>
            <Button onClick={(): void => form.reset()}>Annuler</Button>
          </div>
        )}
      />
    </form>
  );
};
