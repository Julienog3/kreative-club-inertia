import { z } from "zod";
import { useStoreModal } from "../ui/modal/modal.store";
import { FormEventHandler } from "react";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { router } from "@inertiajs/react";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextArea } from "../ui/textarea";
import { vstack } from "~/styled-system/patterns";


export const CreatePortfolioFolderForm = () => {  
  const { closeModal } = useStoreModal((state) => state);
  const { addItem } = useSnackbarStore((state) => state)

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: '',
      description: ''
    },
    onSubmit: async ({ value }) => {
      createPortfolioFolder(value)
    }
  })

  async function createPortfolioFolder(value: any){
    router.post('/portfolio/folders', value, {
      onSuccess: () => {
        closeModal();
        addItem({ type: "success", message: "Le dossier a correctement été ajouté à votre portfolio" })
      },
    })
  };

  return (
    <form 
      className={vstack({ gap: "1rem", w: "100%", alignItems: "start" })}
      onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }}>
      <form.Field 
        name="title"
        children={(field) => (
          <Input
            label="Nom du projet" 
            value={field.state.value}
            placeholder="Ex: Dessin de dromadaire"
            onChange={(e) => field.handleChange(e.target.value)}
            required
          />
        )}
      />
      <form.Field 
        name="description"
        children={(field) => (
          <TextArea 
            label="Décrivez en détails votre projet"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder="Lorem ipsum dolore sit amet"
            required
          />
        )}
      />
      <form.Subscribe 
        selector={(state) => [state.canSubmit]}
        children={([canSubmit]) => (
          <Button type="submit" disabled={!canSubmit}>Ajouter</Button>
        )}
      />
    </form>
  );
};
