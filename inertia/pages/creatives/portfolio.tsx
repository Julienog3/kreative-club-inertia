import { usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import CreativeLayout from "../../components/layout/creative-layout";
import { Layout } from "~/components/layout/layout";
import { PortfolioFolder, PortfolioImage } from "~/types/portfolio";

interface Props {
  creative: User,
  portfolioImages: PortfolioImage[],
  portfolioFolders: PortfolioFolder[]
}

export default function Portfolio(props: Props) {
  const { creative, portfolioImages, portfolioFolders } = props
  const { props: { user } } = usePage()

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
      <CreativeLayout creative={creative}>
        <div className={vstack({ alignItems: 'start', mb: "1.25rem", gap: ".25rem" })}>
          <h2 className={css({ textStyle: "subtitle" })}>
            Portfolio
          </h2>
          <p className={css({ textStyle: "body" })}>L'ensemble des créations de votre créatif</p>
        </div>
        <PortfolioList mode="preview" elements={portfolioElements} />
      </CreativeLayout>
    </>
  );
}

Portfolio.layout = page => <Layout children={page} />

