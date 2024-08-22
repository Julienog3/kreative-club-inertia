import { PortfolioFolder, PortfolioImage } from "~/types/portfolio";
import { useStoreModal } from "../ui/modal/modal.store";
import { PortfolioFolderCard } from "./portfolio-folder-card";
import { PortfolioImageCard } from "./portfolio-image-card";
import { CreatePortfolioItemModal } from "./modals/create-portfolio-item-modal";
import { PortfolioFolderDetailsModal } from "./modals/portfolio-folder-details-modal";
import { useState } from "react";
import { css } from "~/styled-system/css";
import Card from "../ui/card";
import { gridItem, vstack } from "~/styled-system/patterns";
import Plus from "~/assets/icons/plus.svg?react"
import { router } from "@inertiajs/react";

interface Props {
  mode?: "preview" | "edition";
  elements: (PortfolioFolder | PortfolioImage)[];
  portfolioFolderId?: string;
}

export function PortfolioList({
  mode = "preview",
  elements,
  portfolioFolderId,
}: Props) {
  const { isShowed, closeModal, openModal } = useStoreModal((state) => state);
  const [portfolioFolderSelected, setPortfolioFolderSelected] =
    useState<PortfolioFolder>();
  const [isPortfolioFolderModalShowed, setIsPortfolioFolderModalShowed] =
    useState(false);

  const onPortfolioFolderClick = (portfolioFolder: PortfolioFolder) => {
    if (mode === "edition") {
      router.visit(`/preferences/portfolio/folders/${portfolioFolder.id}`)
    }

    if (mode === "preview") {
      setPortfolioFolderSelected(portfolioFolder);
      setIsPortfolioFolderModalShowed(true);
    }
  };

  const renderPortfolioElement = (
    element: PortfolioFolder | PortfolioImage,
  ) => {
    if ((element as PortfolioFolder).description) {
      return (
        <PortfolioFolderCard
          portfolioFolder={element}
          onClick={() => onPortfolioFolderClick(element as PortfolioFolder)}
        />
      );
    }

    return (
      <>
        <PortfolioImageCard
          isEditionMode={mode === "edition"}
          portfolioImage={element as PortfolioImage}
        />
        <p>{element.title}</p>
      </>
    );
  };

  return (
    <>
      <CreatePortfolioItemModal
        isShowed={isShowed}
        portfolioFolderId={portfolioFolderId}
        closeModal={closeModal}
      />
      <PortfolioFolderDetailsModal
        isShowed={isPortfolioFolderModalShowed}
        portfolioFolder={portfolioFolderSelected}
        closeModal={() => setIsPortfolioFolderModalShowed(false)}
      />
      <ul
        className={css({
          display: "grid",
          gridTemplateColumns: 1,
          md: { gridTemplateColumns: 2 },
          lg: { gridTemplateColumns: 3 },
          gap: "1rem",
          width: "100%"
        })}
      >
        {mode === "edition" && (
          <li>
            <Card
              css={{
                h: "18rem",
                pos: "relative",
                cursor: "pointer",
                w: "100%",
                p: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                zIndex: 3,
                // borderStyle: "dashed",
              }}
              onClick={openModal}
            >
              <Card
                css={{
                  h: "12rem",
                  w: "100%",
                  backgroundColor: "gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderStyle: "dashed",
                  fontSize: "1.5rem",
                }}
              >
                <Plus className={css({ width: "2.5rem"})} />
              </Card>
              <h3 className={css({ textStyle: "body" })}>Ajouter un élément</h3>
            </Card>
          </li>
        )}
        {elements &&
          elements.map((element) => {
            return (
              <li
                className={(gridItem(), vstack({ textStyle: "body" }))}
                key={element.id}
              >
                {renderPortfolioElement(element)}
              </li>
            );
          })}
      </ul>
    </>
  );
};
