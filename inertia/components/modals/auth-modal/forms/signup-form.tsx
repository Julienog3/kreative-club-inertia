// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { registerUser } from "../../../../api/auth";
// import { vstack } from "../../../../../styled-system/patterns";
// import Input from "../../../utils/Input/Input";
// import Button from "../../../utils/Button/Button";
import { useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import Input from "~/components/ui/input";
import { useStoreModal } from "~/components/ui/modal/modal.store";
import { vstack } from "~/styled-system/patterns";
// import { useStoreModal } from "../../../utils/Modal/Modal.store";
// import { useEffect } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { UserPayload } from "../../../../api/user";

const userSchema = z
  .object({
    username: z.string().min(3, { message: "Required" }),
    email: z.string().email(),
    password: z.string().min(7, { message: "Required" }),
    password_confirmation: z.string().min(7, { message: "Required" }),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords not the same",
      });
    }
  });

type SignUpInputs = z.infer<typeof userSchema>

const SignUpForm = () => {
  const { data, setData, errors, post, processing } = useForm<SignUpInputs>()

  const closeModal = useStoreModal(({ closeModal }) => closeModal);
  
  const submit: FormEventHandler<HTMLFormElement> = (e) =>  {
    e.preventDefault()
    post('/auth/register')
    closeModal();
  }
  
  return (
    <form
      onSubmit={submit}
      className={vstack({ w: "100%", gap: 4, alignItems: "left" })}
    >
      <Input
        type="text"
        label="Nom d'utilisateur"
        required
        value={data.username}
        onChange={e => setData('username', e.target.value)}
        errorMessage={errors.username}
      />
      <Input
        type="email"
        label="Adresse mail"
        required
        value={data.email}
        onChange={e => setData('email', e.target.value)}
        errorMessage={errors.email}
      />
      <Input
        type="password"
        label="Mot de passe"
        required
        value={data.password}
        onChange={e => setData('password', e.target.value)}
        errorMessage={errors.password}
      />
      <Input
        type="password"
        label="Confirmation du mot de passe"
        required
        value={data.password_confirmation}
        onChange={e => setData('password_confirmation', e.target.value)}
        errorMessage={errors.password_confirmation}
      />
      <Button type="submit" disabled={processing}>S&apos;inscrire</Button>
    </form>
  );
};

export default SignUpForm;
