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
import { Layout } from "~/components/layout/layout";
import ChevronRight from '~/assets/icons/chevron-right.svg?react'
import { ConfirmContextProvider, useConfirm } from "~/components/layout/confirm-context";

interface Props {
  portfolioFolder: PortfolioFolder
}

export default function PortfolioFolderDetails(props: Props) {
  const { portfolioFolder } = props

  const { confirm } = useConfirm()

  async function deletePortfolioFolder(id: string) {
    if (await confirm({
      title: 'bah putain',
      description: 'c\'est cool'
    })) {
      router.delete(`/portfolio/folders/${id}`)
    }
  }

  return (
    <>
      <Head title="Portfolio" />
      <PreferencesLayout>
        <Card withShadow>
          <header
            className={hstack({
              w: "100%",
              p: "1rem",
              justifyContent: "space-between",
              borderBottom: "solid 2px black"
            })}
          >
            <div className={vstack({ alignItems: "start", gap: "0" })}>
              <h2 className={css({ textStyle: "subtitle" })}>Portfolio</h2>
              <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
            </div>
          </header>
          <section
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
              gap: "0"
            })}
          >
              <div
                className={hstack({
                  justifyContent: "space-between",
                  alignItems: "start",
                  w: "100%",
                })}
              >
                <div>
                  <div className={hstack({ textStyle: "body", mb: "1rem", gap: ".25rem" })}>
                    <Link href="/preferences/portfolio">Portfolio</Link>
                    <ChevronRight className={css({ w: "1.25rem", h: "1.25rem" })} />
                    <p className={css({ color: "purple" })}>{portfolioFolder.title}</p>
                  </div>
                  <h2 className={css({ textStyle: "subtitle" })}>
                    Projet &quot;{portfolioFolder.title}&quot;
                  </h2>
                </div>
                <div className={hstack()}>
                  <Button onClick={() => {}}>
                    <Pencil />
                    Modifier
                  </Button>
                  <Button onClick={() => deletePortfolioFolder(portfolioFolder.id)} variant="danger">
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
          </section>
        </Card>
      </PreferencesLayout>
    </>
  )
}

PortfolioFolderDetails.layout = (page: React.ReactNode) => (
  <ConfirmContextProvider>
    <Layout children={page} />
  </ConfirmContextProvider>
)
