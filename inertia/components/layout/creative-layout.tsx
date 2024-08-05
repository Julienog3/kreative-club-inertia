import { Link } from "@inertiajs/react";
import React, { PropsWithChildren } from "react";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import {  hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import HomeIcon from '~/assets/icons/home.svg?react'
import { CreativeDetailsCard } from "~/components/creatives/creative-details-card";
import { CreativeTabs } from "~/components/creatives/creative-tabs";

interface Props extends PropsWithChildren {
  creative: User,
}

const tabs = [
  {
    label: 'Portfolio',
    to: 'portfolio'
  },
  {
    label: 'Avis',
    to: 'reviews'
  }
]

export default function CreativeLayout(props: Props) {
  const { creative, children } = props

  return (
    <>
      <div className={vstack({ 
        bgColor: "lightblue", 
        w: "100%", p: "1rem", 
        alignItems: "start", 
        borderBottom: "2px solid black",
        bgImage: 'url(/images/grid.png)',
        bgPosition: 'center' 
      })}>
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
          <div className={vstack({ gap: '.25rem', alignItems: 'start' })}>
            <h2 className={css({ textStyle: "title" })}>
              Détails d'un créatif
            </h2>
            <p className={css({ textStyle: "body" })}>L’ensemble des créations de votre créatif</p>
          </div>
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
        <div className={hstack({ gap: "1rem", w: "100%", h: "100%", p: "1rem", alignItems: "start" })}>
          <div className={vstack({ w: "100%", h: "100%", alignItems:"start", gap: "0" })}>
            <CreativeTabs tabs={tabs} />
            <section className={css({ 
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: '13px',
              p: "1rem",
              w: "100%", 
              borderTopLeftRadius: "0px", 
              minHeight: "15rem"
            })}>
              {children}
            </section>
          </div>
          <div className={css({ pos: "relative", top: "-8rem", w: "1/3" })}>
            <CreativeDetailsCard creative={creative}/>
          </div>
        </div>
      </div>
    </>
  );
}