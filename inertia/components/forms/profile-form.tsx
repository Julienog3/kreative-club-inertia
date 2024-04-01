import { router, useForm } from "@inertiajs/react";
import { z } from "zod";
import { grid, gridItem, hstack } from "~/styled-system/patterns";
import { User } from "~/types";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { FormEventHandler } from "react";
import { Dropzone } from "../ui/dropzone";

interface Props {
  user: User;
}

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phoneNumber: z.string().optional(),
  avatar: z.any().optional(),
  categories: z.number().array().optional(),
});

export const ProfileForm = ({ user }: Props) => {
  const { data, setData, errors, processing, reset, post } = useForm<z.infer<typeof profileSchema>>(user);

  // const editProfile = useUpdateUser(user.id);
  // const uploadAvatarProfile = useUpdateUserAvatar(user.id);

  // const onSubmit: SubmitHandler<z.infer<typeof profileSchema>> = (
  //   profileData,
  // ) => {
  //   const { avatar, ...payload } = profileData;

  //   if (avatar[0]) {
  //     const avatarPayload = new FormData();
  //     avatarPayload.append("avatar", profileData.avatar[0]);
  //     uploadAvatarProfile.mutate(avatarPayload);
  //   }

  //   editProfile.mutate(payload);
  // };

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    post('/preferences/profile/edit',{
      onSuccess: () => {
        router.reload({ only: ['user'] })
      }
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
            required
            value={data.firstName}
            onChange={e => setData('firstName', e.target.value)}
            errorMessage={errors.firstName} 
          />
        </div>
        <div className={gridItem()}>
          <Input 
            type="text"
            label="Nom de famille"
            required
            value={data.lastName}
            onChange={e => setData('lastName', e.target.value)}
            errorMessage={errors.lastName}  
          />
        </div>
        <div className={gridItem()}>
          <Input 
            type="text"
            label="Numéro de téléphone"
            required
            value={data.phoneNumber}
            onChange={e => setData('phoneNumber', e.target.value)}
            errorMessage={errors.phoneNumber}  
          />
        </div>
        <div className={gridItem({ colSpan: 2 })}>
          <Dropzone label="avatar" value={data.avatar} onChange={e => setData('avatar', e.target.value)} />
        </div>
        {/* <div className={gridItem({ colSpan: 2 })}>
          <Controller
            control={control}
            name="categories"
            render={({ field }) => <Autocomplete {...field} />}
          />
        </div> */}
        <div className={hstack()}>
          <Button type="submit" disabled={processing}>Enregistrer</Button>
          <Button onClick={(): void => reset()}>Annuler</Button>
        </div>
      </form>
  );
};
