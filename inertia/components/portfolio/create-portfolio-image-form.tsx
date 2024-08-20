import { router } from "@inertiajs/react";
import { useStoreModal } from "../ui/modal/modal.store";
import { hstack, vstack } from "~/styled-system/patterns";
import Input from "../ui/input";
import { Dropzone } from "../ui/dropzone";
import { Button } from "../ui/button";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";

interface Props {
  portfolioFolderId?: string;
}

export const CreatePortfolioImageForm = ({
  portfolioFolderId,
}: Props) => {
  const { addItem } = useSnackbarStore((state) => state)
  const { closeModal } = useStoreModal((state) => state);

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: '',
      image: undefined
    },
    onSubmit: async ({ value }) => {
      await createPortfolioImage(value)
    }
  }) 

  async function createPortfolioImage(value: any) {
    const baseUrl = new URL('/portfolio/images', 'http://localhost:3333/')

    const formData = new FormData();
    formData.append('title', value.title)
    formData.append('image', value.image)

    if (portfolioFolderId) {
      baseUrl.searchParams.append('portfolioFolderId', portfolioFolderId)
    }

    await router.post(baseUrl , formData, { 
      onSuccess: () => {
        closeModal()
        router.reload()
        addItem({ type: "success", message: "L'image a correctement été ajouté à votre portfolio" })
      }, 
      onError: (err) => console.log(err),
      forceFormData: true, 
    })
  }

  return (
      <form
        className={vstack({ gap: "1rem", w: "100%", alignItems: "start" })}
        onSubmit={(e): void => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.Field 
          name="title"
          children={(field) => (
            <Input 
              name={field.name}
              label="Nom de l'élément" 
              placeholder="Ex: Dessin d'une tortue"
              value={field.state.value} 
              onChange={(e) => field.handleChange(e.target.value)}
              controlProps={{ width: "30rem" }} 
              required 
            />
          )}
        />
        <form.Field 
          name="image"
          children={(field) => (
            <Dropzone 
              name={field.name}
              label="Illustration"
              maxFiles={1}
              value={field.state.value}
              onChange={(e) => {
                if (!e.target.files?.length) return 
                // @ts-expect-error
                field.handleChange(e.target.files![0])
              }}
              required
              // errorMessage={field.state.meta.errors.join(', ')} 
            />
          )}
        />
        <form.Subscribe 
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <div className={hstack({ justifyContent: "end", w: "100%" })}>
              <Button disabled={!canSubmit} type="submit">Ajouter</Button>
              <Button variant="ghost" onClick={closeModal}>Annuler</Button>
            </div>
          )}
        />
      </form>
  );
};
