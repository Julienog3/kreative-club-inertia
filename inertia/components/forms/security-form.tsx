import { router, usePage } from "@inertiajs/react"
import { useForm } from "@tanstack/react-form"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { css } from "~/styled-system/css"
import { vstack } from "~/styled-system/patterns"
import Input from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { z } from "zod"
import { User } from "~/types"
import { useSnackbarStore } from "../ui/snackbar/snackbar.store"

export function SecurityForm() {
  const { user } = usePage().props
  const { addItem } = useSnackbarStore(store => store)

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      password: '',
      confirmedPassword: ''
    },
    onSubmit: async ({ value }) => {
      await saveChanges(value)
    }
  })

  async function saveChanges(value: any) {
    await router.put(`/users/${(user as User).id}`, 
      { password: value.password },
      {
        onSuccess: () => {
          addItem({ type: "success", message: "Votre profil a été correctement modifié."})
          router.reload({ only: ['user'] })
        }
      }
    )

  }

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
        
      }}
    >
      <section className={vstack({ alignItems: "start" })}>
        <div className={vstack({ alignItems: "start", gap: "0" })}>
          <h4 className={css({ textStyle: "h4" })}>Modifier votre mot de passe</h4>
          <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
        </div>
        <form.Field 
          name="password"
          validators={{
            onChange: z
              .string()
              .min(7, 'Votre mot de passe doit contenir au minimum 7 caractères.'),
            onChangeAsyncDebounceMs: 500
          }}
          children={(field) => (
            <Input 
              id={field.name}
              name={field.name}
              type="password"
              label="Nouveau mot de passe"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.join(', ')}
            />
          )}
        />
      <form.Field 
        name="confirmedPassword"
        validators={{
          onChangeListenTo: ['password'],
          onChangeAsync: z.string().refine(
            async (value) => {
              return value === form.state.values.password
            },
            {
              message: 'La confirmation du mot de passe doit être identique au mot de passe écrit.'
            }
          ),
          onChangeAsyncDebounceMs: 500
        }}
        children={(field) => (
          <Input 
            id={field.name}
            name={field.name}
            label="Confirmation du mot de passe"
            type="password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            errorMessage={field.state.meta.errors.join(', ')}
          />
        )}
      />
      </section>
      <form.Subscribe 
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button disabled={!canSubmit} type="submit">Enregistrer</Button>
        )}
      />
    </form>
  )
}