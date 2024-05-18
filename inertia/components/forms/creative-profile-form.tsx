import { router, useForm, usePage } from "@inertiajs/react";
import { z } from "zod";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { FormEventHandler } from "react";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { TextArea } from "../ui/textarea";
import { Category } from "~/types/category";
import { Switch } from "../ui/switch";
import { css } from "~/styled-system/css";
import { Combobox } from "../ui/combobox";

const profileSchema = z.object({
  description: z.string().optional(),
  categories: z.number().array().optional(),
  portfolioEnabled: z.boolean()
});

type ProfileInputs = z.infer<typeof profileSchema>

interface Props {
  categories: Category[]
}

export function CreativeProfileForm(props: Props) {
  const { props: { user }} = usePage()
  const { categories } = props
  const { data, setData, errors, processing, reset, put } = useForm<ProfileInputs>(user as ProfileInputs);
  const { addItem } = useSnackbarStore(store => store)

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    put('/preferences/profile/edit',{
      onSuccess: () => {
        addItem({ type: "success", message: "Votre profil a été correctement modifié."})
        router.reload({ only: ['user'] })
      },
      onError: () => {
        addItem({ type: "danger", message: "Une erreur est survene lors de la modification de votre profil."})
      },
      forceFormData: true,
    })
  }

  return (
      <form
        onSubmit={submit}
        className={vstack({ alignItems: 'left' })}
      >
        <div>
          <TextArea 
            type="text"
            label="Description"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            errorMessage={errors.description} 
            placeholder="10 mots minimum..."
          />
        </div>
        <div>
          {/* <Input label="Catégories"  list="categories" placeholder="ouais"/>
          {categories && <datalist id="categories">
            {categories.map(({ id, title }) => <option key={id} value={title}/>)}
          </datalist>} */}
          {categories && <Combobox label="Catégories" name="categories" value={data.categories} onValueChange={(details => setData('categories', details))}/>}
        </div>
        <div>
          <p className={css({ textStyle: "body" })}>Activer le portfolio</p>
          <Switch checked={data.portfolioEnabled} onCheckedChange={() => setData('portfolioEnabled', !data.portfolioEnabled)} />
        </div>
        <div className={hstack()}>
          <Button type="submit" disabled={processing}>Enregistrer</Button>
          <Button onClick={(): void => reset()}>Annuler</Button>
        </div>
      </form>
  );
};
