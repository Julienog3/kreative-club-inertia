import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { Layout } from "~/components/layout/layout";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { PortfolioFolder, PortfolioImage } from "~/types/portfolio";

interface Props {
  portfolioImages: PortfolioImage[]
  portfolioFolders: PortfolioFolder[]
}

export default function Portfolio(props: Props) {
  const { portfolioImages, portfolioFolders } = props

  const portfolioElements = useMemo(
    () =>
      portfolioImages && portfolioFolders
        ? [...portfolioImages, ...portfolioFolders].sort(
            (a, b) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
          )
        : [],
    [portfolioImages, portfolioFolders],
  );

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
          <section className={vstack({ p: "1rem", alignItems: "start" })}>
            <PortfolioList
              mode="edition"
              elements={portfolioElements}
            />
          </section>
        </Card>
      </PreferencesLayout>
    </>
  )
}

Portfolio.layout = (page: React.ReactNode) => <Layout children={page} />
