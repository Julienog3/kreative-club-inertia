// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { Credentials } from "../../../../api/auth";
// import { vstack } from "../../../../../styled-system/patterns";
// import Input from "../../../utils/Input/Input";
// import Button from "../../../utils/Button/Button";
// import { z } from "zod";
// import { useEffect } from "react";
// import { useSnackbarStore } from "../../../layout/Snackbar/Snackbar.store";
// import { useAuth } from "../../../../hooks/useAuth";
// import { reload } from "vike/client/router";
// import { useStoreAuthModal } from "../AuthModal.store";

// import { useEffect } from "react";
import { vstack } from "~/styled-system/patterns";
import { useForm } from '@inertiajs/react'
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
  // const { register, handleSubmit, control } = useForm<FieldValues>({
  //   resolver: zodResolver(loginSchema),
  // });

  const { data, setData, errors, processing, post } = useForm<LoginInputs>()

  const closeModal = useStoreAuthModal(({ closeModal }) => closeModal);
  const addItem = useSnackbarStore(({ addItem }) => addItem);
  // const { signIn } = useAuth();

  // const { isPending, isSuccess } = signIn;

  // const onSubmit: SubmitHandler<FieldValues> = (credentials) => {
  //   signIn.mutate(credentials as Credentials);
  // };

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    post('/auth/login', {
      onSuccess: () => {
        addItem({
          type: "success",
          message: "Connecté",
        });
        closeModal()
      } 
    })
  }

  // useEffect(() => {
  //   console.log("isSuccess", isSuccess);
  //   if (isSuccess) {
  //     addItem({
  //       type: "success",
  //       message: "Connecté",
  //     });
  //     closeModal();
  //     reload();
  //   }
  // }, [isSuccess]);

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
