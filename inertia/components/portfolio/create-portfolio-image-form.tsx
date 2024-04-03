import { router, useForm, usePage } from "@inertiajs/react";
import { set, z } from "zod";
import { useStoreModal } from "../ui/modal/modal.store";
import { FormEventHandler } from "react";
import { hstack, vstack } from "~/styled-system/patterns";
import Input from "../ui/input";
import { Dropzone } from "../ui/dropzone";
import { Button } from "../ui/button";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";

const createPortfolioSchema = z.object({
  title: z.string().min(4),
  image: z.any(),
});

type createPortfolioInputs = z.infer<typeof createPortfolioSchema>

interface Props {
  portfolioFolderId?: string;
}

export const CreatePortfolioImageForm = ({
  portfolioFolderId,
}: Props) => {
  const { data, setData, post } = useForm<createPortfolioInputs>()


  const { props: { user } } = usePage();
  const { addItem } = useSnackbarStore((state) => state)
  const { closeModal } = useStoreModal((state) => state);

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    let baseUrl = '/portfolio/images' 

    if (portfolioFolderId) {
      baseUrl += `?portfolioFolderId=${portfolioFolderId}`
    }

    post(baseUrl , { 
      onSuccess: () => {
        closeModal()
        router.reload()
        addItem({ type: "success", message: "L'image a correctement été ajouté à votre portfolio" })
      }, 
      onError: (err) => console.log(err), 
      forceFormData: true
    })
  };

  return (
      <form
        className={vstack({ gap: "1rem", w: "100%", alignItems: "start" })}
        onSubmit={submit}
      >
        <Input label="title" value={data.title} onChange={e => setData('title', e.target.value)} required />
        <Dropzone onChange={e => setData('image', e.target.files![0])} label="image" required />
        <div className={hstack({ justifyContent: "end", w: "100%" })}>
          <Button disabled>Annuler</Button>
          <Button type="submit">Ajouter</Button>
        </div>
      </form>
  );
};
