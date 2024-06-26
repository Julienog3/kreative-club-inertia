import { Link, router, usePage } from "@inertiajs/react";
import React, { useMemo } from "react";
import { PortfolioList } from "~/components/portfolio/portfolio-list";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import HomeIcon from '~/assets/icons/home.svg?react'


interface Props {
  creative: User,
}

export default function Single(props: Props) {
  const { creative } = props
  const { props: { user }} = usePage()

  // function handleBookmark(): void {}

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

  return (
    <>
      <div className={vstack({ bgColor: "yellow", w: "100%", p: "1rem", alignItems: "start", borderBottom: "2px solid black" })}>
        <div 
          className={vstack({
            alignItems: "start",
            width: "100%",
            maxWidth: "breakpoint-xl",
            margin: "0 auto",
            p: "1rem",
          })}
          >
          <div className={hstack({ mb: "2.5rem" })}>
            <Link href='/'>
              <Chip>
                <HomeIcon /> Retourner à l'accueil
              </Chip>
            </Link>
          </div>
          <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
            Portfolio
          </h2>
        </div>
      </div>
      <div
        className={vstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
        })}
      >
        <div className={grid({ columns: 6, gap: "1rem", w: "100%", p: "1rem" })}>
          <div className={gridItem({ colSpan: 4 })}>
            <Card css={{ p: "1rem" }}>
              <PortfolioList mode="preview" elements={portfolioElements} />
            </Card>
          </div>
          <div
            className={gridItem({
              colSpan: 2,
              position: "sticky",
              top: "1rem",
              left: "0rem",
            })}
          >
            <Card css={{ p: "1rem" }} withShadow>
              <div className={hstack({ gap: "1.5rem" })}>
                {creative.avatar && <img
                  className={css({
                    border: "solid 2px #000",
                    borderRadius: "12px",
                    width: "4rem",
                    height: "4rem",
                  })}
                  src={creative.avatar}
                  alt=""
                />}
                <div className={vstack({ alignItems: "left", gap: 0 })}>
                  <h2 className={css({ textStyle: "subtitle" })}>
                    {creative.firstName} {creative.lastName}
                  </h2>
                  <span className={css({ textStyle: "body", color: "purple" })}>
                    @{creative.username}
                  </span>
                </div>
              </div>
              <div>
                <h3 className={css({ textStyle: "subtitle" })}>A propos</h3>
                <p className={css({ textStyle: "body" })}>
                  {creative.description}
                </p>
                {creative.categories && (
                  <>
                    <h3 className={css({ textStyle: "subtitle" })}>
                      Compétences
                    </h3>
                    <ul className={hstack()}>
                      {creative.categories.map((category) => {
                        return (
                          <li key={category.id}>
                            <Chip>{category.title}</Chip>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </div>
              <div className={hstack({ mt: "1rem" })}>
                {/* <Button onClick={() => handleBookmark()}>
                  Bookmark
                </Button> */}
                <Button variant="success" onClick={() => createOrder()}>
                  Commander
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}