import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
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
        <Card>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <h1 className={css({ textStyle: "title" })}>Portfolio</h1>
            <p className={css({ textStyle: "body", mb: "1rem" })}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Praesent at quam nulla. Nam id leo mauris.
            </p>
            <PortfolioList
              mode="edition"
              elements={portfolioElements}
            />
          </div>
        </Card>
      </PreferencesLayout>
    </>
  )
}