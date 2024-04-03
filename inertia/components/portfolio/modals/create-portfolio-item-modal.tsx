
import { useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import { CreatePortfolioFolderForm } from "../create-portfolio-folder-form";
import { CreatePortfolioImageForm } from "../create-portfolio-image-form";
import { Modal, modalTransitionConfig } from "~/components/ui/modal/modal";
import { Button } from "~/components/ui/button";
import { hstack } from "~/styled-system/patterns";

type PortfolioType = "folder" | "image";
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

  const selectType = (type: PortfolioType) => {
    setCreatePortfolioType(type);
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
              style={{ ...style }}
              onClose={() => {
                closeModal();
              }}
            >
              {!portfolioFolderId && (
                <div className={hstack()}>
                  <Button onClick={() => selectType("image")}>Image</Button>
                  <Button onClick={() => selectType("folder")}>Dossier</Button>
                </div>
              )}
              {renderModalForm()}
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
