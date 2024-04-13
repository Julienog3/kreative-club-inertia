import { router, useForm } from "@inertiajs/react";
import { z } from "zod";
import { grid, gridItem, hstack } from "~/styled-system/patterns";
import { User } from "~/types";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { FormEventHandler } from "react";
import { Dropzone } from "../ui/dropzone";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
interface Props {
  user: User;
}

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  avatarFile: z.any().optional(),
  // categories: z.number().array().optional(),
});

type ProfileInputs = z.infer<typeof profileSchema>

export const ProfileForm = ({ user }: Props) => {
  console.log({ user })

  const { data, setData, errors, processing, reset, put } = useForm<ProfileInputs>({
    firstName: user.firstName,
    lastName: user.lastName,
    avatarFile: undefined,
    phoneNumber: user.phoneNumber
  });
  const { addItem } = useSnackbarStore(store => store)

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    put('/preferences/profile/edit',{
      onSuccess: () => {
        addItem({ type: "success", message: "Votre profil a été correctement modifié."})
        router.reload({ only: ['user'] })
      },
      onError: (err) => {
        addItem({ type: "danger", message: "Une erreur est survene lors de la modification de votre profil."})
      },
      forceFormData: true,
    })
  }

  return (
      <form
        onSubmit={submit}
        className={grid({ gap: "1rem", columns: 2, w: "100%" })}
      >
        <div className={gridItem()}>
          <Input 
            type="text"
            label="Prénom"
            value={data.firstName}
            onChange={e => setData('firstName', e.target.value)}
            errorMessage={errors.firstName} 
          />
        </div>
        <div className={gridItem()}>
          <Input 
            type="text"
            label="Nom de famille"
            value={data.lastName}
            onChange={e => setData('lastName', e.target.value)}
            errorMessage={errors.lastName}  
          />
        </div>
        <div className={gridItem()}>
          <Input 
            type="text"
            label="Numéro de téléphone"
            value={data.phoneNumber}
            onChange={e => setData('phoneNumber', e.target.value)}
            errorMessage={errors.phoneNumber}  
          />
        </div>
        <div className={gridItem({ colSpan: 2 })}>
          <Dropzone label="avatar" onChange={e => setData('avatarFile', e.target.files![0])} />
        </div>
        <div className={hstack()}>
          <Button type="submit" disabled={processing}>Enregistrer</Button>
          <Button onClick={(): void => reset()}>Annuler</Button>
        </div>
      </form>
  );
};
