import { vstack } from "~/styled-system/patterns";
import { router, useForm } from '@inertiajs/react'
import { z } from "zod"
import Input from "./../../../ui/input";
import { Button } from "./../../../ui/button";
import { FormEventHandler } from "react";
import { useSnackbarStore } from "~/components/ui/snackbar/snackbar.store";
import { useStoreAuthModal } from "../auth-modal.store";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginInputs = z.infer<typeof loginSchema>

export function LoginForm() {
  const { data, setData, errors, processing, post } = useForm<LoginInputs>()

  const closeModal = useStoreAuthModal(({ closeModal }) => closeModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    post('/auth/login', {
      onSuccess: () => {
        router.reload({ only: ['user'] })
        addItem({
          type: "success",
          message: "Connecté",
        });
        closeModal()
      } 
    })
  }
  
  return (
    <form
      onSubmit={submit}
      className={vstack({ w: "100%", gap: 10, alignItems: "left" })}
    >
      <div className={vstack({ w: "100%", gap: 4, alignItems: "left" })}>
        <Input 
          label="email" 
          type="email" 
          required 
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          errorMessage={errors.email}
        />
        <Input
          type="password"
          label="password"
          required
          value={data.password}
          onChange={e => setData('password', e.target.value)}
          errorMessage={errors.password}
        />
      </div>
      <Button type="submit" disabled={processing}>
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;
