import { router, useForm } from "@inertiajs/react";
import { z } from "zod";
import { grid, gridItem, hstack } from "~/styled-system/patterns";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { FormEventHandler, useEffect } from "react";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { TextArea } from "../ui/textarea";
import { Category } from "~/types/category";
import { Switch } from "../ui/switch";

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
  const { categories } = props
  const { data, setData, errors, processing, reset, put } = useForm<ProfileInputs>({ portfolioEnabled: false });
  const { addItem } = useSnackbarStore(store => store)
  // const { props: { user } } = usePage()

  useEffect(() => {
    console.log(data.portfolioEnabled)
  }, [data.portfolioEnabled])

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    put('/preferences/profile/edit',{
      onSuccess: () => {
        addItem({ type: "success", message: "Votre profil a été correctement modifié."})
        router.reload({ only: ['user'] })
      },
      onError: (err) => {
        console.log({err})
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
          <TextArea 
            type="text"
            label="Description"
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            errorMessage={errors.description} 
            placeholder="10 mots minimum..."
          />
        </div>
        <div className={gridItem()}>
          <Input label="Catégories"  list="categories" placeholder="ouais"/>
          {categories && <datalist id="categories">
            {categories.map(({ id, title }) => <option key={id} value={title}/>)}
          </datalist>}
        </div>
        <div className={gridItem()}>
          test
          <Switch checked={data.portfolioEnabled} onCheckedChange={() => setData('portfolioEnabled', !data.portfolioEnabled)} />
        </div>
        <div className={hstack()}>
          <Button type="submit" disabled={processing}>Enregistrer</Button>
          <Button onClick={(): void => reset()}>Annuler</Button>
        </div>
      </form>
  );
};
