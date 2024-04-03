import { z } from "zod";
import { useStoreModal } from "../ui/modal/modal.store";
import { FormEventHandler } from "react";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { router, useForm } from "@inertiajs/react";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";

const createPortfolioFolderSchema = z.object({
  title: z.string().min(4),
  description: z.string().optional(),
});

type createPortfolioFolderInputs = z.infer<typeof createPortfolioFolderSchema>

export const CreatePortfolioFolderForm = () => {
  const { data, setData, processing, post } = useForm<createPortfolioFolderInputs>();

  // const queryClient = useQueryClient();
  // const { user } = usePageContext();

  // const createPortfolioFolder = useCreatePortfolioFolder(user.id);

  const { closeModal } = useStoreModal((state) => state);
  const { addItem } = useSnackbarStore((state) => state)

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    post('/portfolio/folders', {
      onSuccess: () => {
        closeModal();
        addItem({ type: "success", message: "Le dossier a correctement été ajouté à votre portfolio" })
      },
    })
  };

  return (
    <form onSubmit={submit}>
      <Input label="title" value={data.title} onChange={e => setData('title', e.target.value)} required />
      <Input label="description" value={data.description} onChange={e => setData('description', e.target.value)} />
      <Button type="submit" disabled={processing}>Ajouter</Button>
    </form>
  );
};
