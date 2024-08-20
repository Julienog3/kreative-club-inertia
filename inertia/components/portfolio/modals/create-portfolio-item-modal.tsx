
import { useTransition } from "@react-spring/web";
import { useState } from "react";
import { CreatePortfolioFolderForm } from "../create-portfolio-folder-form";
import { CreatePortfolioImageForm } from "../create-portfolio-image-form";
import { Modal, modalTransitionConfig } from "~/components/ui/modal/modal";
import { RadioGroup } from "~/components/ui/radio-group";

type PortfolioType = "folder" | "image";

const typesList = [
  { label: 'Projet avec plusieurs éléments', value: 'folder' }, 
  { label: 'Elément individuel', value: 'image' }
]

interface CreatePortfolioItemModalProps {
  isShowed: boolean;
  closeModal: () => void;
  portfolioFolderId?: string;
}

export const CreatePortfolioItemModal = ({
  isShowed,
  closeModal,
  portfolioFolderId,
}: CreatePortfolioItemModalProps) => {
  const modalTransition = useTransition(isShowed, modalTransitionConfig);
  const [createPortfolioType, setCreatePortfolioType] =
    useState<PortfolioType>("image");

  const renderModalForm = () => {
    switch (createPortfolioType) {
      case "folder":
        return <CreatePortfolioFolderForm />;
      case "image":
        return <CreatePortfolioImageForm portfolioFolderId={portfolioFolderId} />;
      default:
        return null;
    }
  };

  return (
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title={
                createPortfolioType === "image"
                  ? "Ajouter une image"
                  : "Ajouter un dossier"
              }
              description="Tempus iaculis urna id volutpat lacus."
              style={{ ...style }}
              onClose={() => {
                closeModal();
              }}
            >
              {!portfolioFolderId && <RadioGroup
                name="type"
                label="Type d'élement"
                elements={typesList}
                onChange={({ value }) => setCreatePortfolioType(value as PortfolioType)}
                value={createPortfolioType}
              />}
              {renderModalForm()}
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
