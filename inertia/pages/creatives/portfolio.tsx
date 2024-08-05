import { router, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import CreativeLayout from "../../components/layout/creative-layout";

interface Props {
  creative: User,
}

export default function CreativePortfolio(props: Props) {
  const { creative } = props
  const { props: { user } } = usePage()

  async function createOrder(): Promise<void> {
    await router.post('/orders', {
      sellerId: creative.id,
      customerId: (user as User).id,
      step: 'not-started'
    })
  }

  const portfolioElements = useMemo(
    () =>
      creative.portfolioImages && creative.portfolioFolders
        ? [...creative.portfolioImages, ...creative.portfolioFolders].sort(
            (a, b) =>
              new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
          )
        : [],
    [creative.portfolioImages, creative.portfolioFolders],
  );

  console.log({ portfolioElements })

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

