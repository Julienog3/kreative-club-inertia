import { vstack } from "~/styled-system/patterns";
import { router } from '@inertiajs/react'
import Input from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useSnackbarStore } from "~/components/ui/snackbar/snackbar.store";
import { useStoreAuthModal } from "../auth-modal.store";
import { useForm } from "@tanstack/react-form";

export function LoginForm() {
  // const { data, setData, errors, processing, post } = useForm<LoginInputs>()

  const closeModal = useStoreAuthModal(({ closeModal }) => closeModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      await router.post('/auth/login', value, {
        onSuccess: (res) => {
          console.log(res)
          router.reload({ only: ['user'] })
          addItem({
            type: "success",
            message: "Connecté",
          });
          closeModal()
        },
        onError: () => {
          router.reload({ only: ['user'] })
          addItem({
            type: "danger",
            message: "Fail",
          });
        } 
      })
    }
  })
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={vstack({ w: "100%", gap: 10, alignItems: "left" })}
    >
      <div className={vstack({ w: "100%", gap: 4, alignItems: "left", mb: "1rem" })}>
        <form.Field 
          name="email"
          children={(field) => (
            <Input 
              label="Adresse mail" 
              name={field.name}
              type="email" 
              required
              placeholder="john.doe@mail.com"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.join(', ')} 
            />
          )}
        />
        <form.Field 
          name="password"
          children={(field) => (
            <Input
              name={field.name}
              type="password"
              label="Mot de passe"
              required
              placeholder="Entrez votre mot de passe"
              value={field.state.value}
              onChange={e => field.handleChange(e.target.value)}
              errorMessage={field.state.meta.errors.join(', ')} 
            />
          )}
        />
      </div>
      <form.Subscribe 
        selector={(state) => [state.isSubmitting]}
        children={([isSubmitting]) => (
          <Button size="large" type="submit" disabled={isSubmitting}>
            Se connecter
          </Button>
        )}
      />
      
    </form>
  );
};

export default LoginForm;
