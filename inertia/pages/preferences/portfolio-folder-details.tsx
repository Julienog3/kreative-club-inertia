import { Head, Link, router } from "@inertiajs/react";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { PortfolioFolder } from "~/types/portfolio";
import Pencil from "~/assets/icons/pencil.svg?react"
import Bin from "~/assets/icons/bin.svg?react"

interface Props {
  portfolioFolder: PortfolioFolder
}

export default function PortfolioFolderDetails(props: Props) {
  const { portfolioFolder } = props

  console.log({ portfolioFolder })

  function onDelete(id: string) {
    router.delete(`/portfolio/folders/${id}`)
  }

  return (
    <>
      <Head title="Portfolio" />
      <PreferencesLayout>
        <Card>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <div
              className={vstack({
                height: "100%",
                alignItems: "start",
                w: "100%",
              })}
            >
              <div
                className={hstack({
                  justifyContent: "space-between",
                  alignItems: "start",
                  w: "100%",
                  mb: "1rem",
                })}
              >
                <div>
                  <Link href="/preferences/portfolio">Retour au portfolio</Link>
                  <h2 className={css({ textStyle: "subtitle" })}>
                    Projet &quot;{portfolioFolder.title}&quot;
                  </h2>
                </div>
                <div className={hstack()}>
                  <Button onClick={() => {}}>
                    <Pencil />
                    Modifier
                  </Button>
                  <Button onClick={() => onDelete(portfolioFolder.id)} variant="danger">
                    <Bin />
                    Supprimer
                  </Button>
                </div>
              </div>
              <p className={css({ textStyle: "body", mb: "1rem" })}>
                {portfolioFolder.description}
              </p>
              {portfolioFolder.portfolioImages && (
                <PortfolioList
                  mode="edition"
                  elements={portfolioFolder.portfolioImages}
                  portfolioFolderId={portfolioFolder.id}
                />
              )}
            </div>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  )
}