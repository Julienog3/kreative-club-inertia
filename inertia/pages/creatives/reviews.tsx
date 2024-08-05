import { Link, router, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import Card from "~/components/ui/card";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import {  gridItem, hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import HomeIcon from '~/assets/icons/home.svg?react'
import { CreativeDetailsCard } from "~/components/creatives/creative-details-card";
import { CreativeTabs } from "~/components/creatives/creative-tabs";
import CreativeLayout from "../../components/layout/creative-layout";


interface Props {
  creative: User,
}

export default function CreativePortfolio(props: Props) {
  const { creative } = props
  const { props: { user } } = usePage()

  return (
    <>
      <CreativeLayout creative={creative}>
        <div>
          <h2 className={css({ textStyle: "subtitle", mb: ".25rem" })}>
            Avis
          </h2>
          <p className={css({ textStyle: "body" })}>L’ensemble des avis de votre créatif</p>
        </div>
      </CreativeLayout>
    </>
  );
}

