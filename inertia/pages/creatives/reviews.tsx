import { Link, router, usePage } from "@inertiajs/react";
import React, { useEffect, useMemo } from "react";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import Card from "~/components/ui/card";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import {  grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import HomeIcon from '~/assets/icons/home.svg?react'
import { CreativeDetailsCard } from "~/components/creatives/creative-details-card";
import { CreativeTabs } from "~/components/creatives/creative-tabs";
import CreativeLayout from "../../components/layout/creative-layout";
import { Layout } from "~/components/layout/layout";
import { ReviewCard } from "~/components/orders/review-card";
import { Review } from "~/types/order";


interface Props {
  creative: User,
  isBookmarked: boolean
  reviews: Review[]
}

export default function Reviews(props: Props) {
  const { creative, isBookmarked, reviews } = props
  const { props: { user } } = usePage()

  useEffect(() => {
    console.log({ reviews })
  }, [])

  return (
    <>
      <CreativeLayout creative={creative} isBookmarked={isBookmarked}>
        <section>
          <h2 className={css({ textStyle: "subtitle", mb: ".25rem" })}>
            Avis
          </h2>
          <p className={css({ textStyle: "body" })}>L’ensemble des avis de votre créatif</p>
          <ul 
            className={css({
              display: "grid",
              gridTemplateColumns: 1,
              md: { gridTemplateColumns: 2 },
              gap: "1rem",
              width: "100%"
            })}
          >
            {reviews.map((review) => <li>
              <ReviewCard review={review} />
            </li>)}
          </ul>
        </section>
        
      </CreativeLayout>
    </>
  );
}

Reviews.layout = (page: React.ReactNode) => <Layout children={page} />

