import { useTransition } from "@react-spring/web";
import { Modal, modalTransitionConfig } from "~/components/ui/modal/modal";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { PortfolioFolder } from "~/types/portfolio";
import { PortfolioList } from "../portfolio-list";


interface Props {
  isShowed: boolean;
  closeModal: () => void;
  portfolioFolder?: PortfolioFolder;
}

export function PortfolioFolderDetailsModal({
  isShowed,
  closeModal,
  portfolioFolder,
}: Props) {
  const modalTransition = useTransition(isShowed, modalTransitionConfig);
  return (
    <>
      {modalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <Modal
              title={portfolioFolder!.title}
              style={{ ...style }}
              onClose={() => closeModal()}
            >
              <div className={vstack({ alignItems: "start" })}>
                <p className={css({ textStyle: "body", mb: "1.5rem" })}>
                  {portfolioFolder?.description}
                </p>
                {portfolioFolder && portfolioFolder.portfolioImages && (
                  <PortfolioList
                    mode="preview"
                    elements={portfolioFolder.portfolioImages}
                    portfolioFolderId={portfolioFolder.id}
                  />
                )}
              </div>
            </Modal>
          )}
        </>
      ))}
    </>
  );
};
