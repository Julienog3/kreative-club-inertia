import { router } from "@inertiajs/react";
import { z } from "zod";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { FormEventHandler } from "react";
import { Dropzone } from "../ui/dropzone";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { css } from "~/styled-system/css";
interface Props {
  id: string;
  user: User;
}

export const ProfileForm = (props: Props) => {
  const { id, user } = props
  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarFile: undefined,
      phoneNumber: user.phoneNumber,
      email: user.email,
    },
    onSubmit: async ({ value }) => {
      await router.put(`/users/${(user as User).id}`, value , {
        onSuccess: () => {
          addItem({ type: "success", message: "Votre profil a été correctement modifié." })
          router.reload({ only: ['user'], preserveScroll: true })
        },
        onError: (err) => {
          addItem({ type: "danger", message: "Une erreur est survene lors de la modification de votre profil." })
        },
        forceFormData: true,
      })
    }
  })

  const { addItem } = useSnackbarStore(store => store)

  return (
      <form
        id={id}
        onSubmit={(e) => { 
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={vstack({ gap: "1rem", alignItems: "start", w: "100%" })}
      >
        <section className={vstack({ alignItems: "start" })}>
          <div className={vstack({ alignItems: "start", gap: "0" })}>
            <h4 className={css({ textStyle: "h4" })}>Informations personnelles</h4>
            <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
          </div>
          <form.Field 
            name="username"
            children={(field) => (
              <Input 
                label="Nom d'utilisateur"
                value={field.state.value}
                disabled
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')} 
                controlProps={{ width: "15rem" }}
              />
            )}
          />
          <form.Field 
            name="firstName"
            children={(field) => (
              <Input 
                label="Prénom"
                value={field.state.value}
                placeholder="John"
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')} 
              />
            )}
          />
          <form.Field 
            name="lastName"
            children={(field) => (
              <Input 
                label="Nom de famille"
                value={field.state.value}
                placeholder="Doe"
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')} 
              />
            )}
          />
          <form.Field 
            name="avatarFile"
            children={(field) => (
              <Dropzone 
                label="Photo de profil"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.files![0])}
                // errorMessage={field.state.meta.errors.join(', ')} 
              />
            )}
          />
        </section>
        <section className={vstack({ alignItems: "start" })}>
          <div className={vstack({ alignItems: "start", gap: "0" })}>
            <h4 className={css({ textStyle: "h4" })}>Informations de contact</h4>
            <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
          </div>
          <form.Field 
            name="phoneNumber"
            children={(field) => (
              <Input 
                label="Numéro de téléphone"
                value={field.state.value}
                placeholder="ex: 0102030405"
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')} 
              />
            )}
          />
          <form.Field 
            name="email"
            children={(field) => (
              <Input 
                label="Adresse mail"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled
                errorMessage={field.state.meta.errors.join(', ')} 
              />
            )}
          />
        </section>
        
        {/* <div className={gridItem({ colSpan: 2 })}>
          <Dropzone label="avatar" onChange={e => setData('avatarFile', e.target.files![0])} />
        </div>  */}
        <form.Subscribe 
          selector={(state) => [state.isDirty, state.isSubmitting]}
          children={([isDirty, isSubmitting]) => (
            <div className={hstack()}>
              <Button type="submit" disabled={!isDirty && !isSubmitting}>Enregistrer</Button>
              <Button onClick={(): void => form.reset()}>Annuler</Button>
            </div>
          )}
        />
      </form>
  );
};
