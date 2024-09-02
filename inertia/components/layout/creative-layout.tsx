import React, { PropsWithChildren } from "react";
import { css } from "~/styled-system/css";
import {  hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import { CreativeDetailsCard } from "~/components/creatives/creative-details-card";
import { CreativeTabs } from "~/components/creatives/creative-tabs";
import { Breadcrumb } from "../ui/breadcrumb";
import GroupIcon from '~/assets/icons/group.svg?react'
import { PageHeader } from "./page-header";


interface Props extends PropsWithChildren {
  creative: User,
  isBookmarked: boolean
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
  const { creative, isBookmarked, children } = props

  const breadcumbItems = [
    {
      label: 'Tous les créatifs',
      to: '/creatives',
      icon: <GroupIcon />
    }
  ]

  return (
    <>
    <PageHeader color="lightblue">
      <Breadcrumb elements={breadcumbItems} />
      <div className={vstack({ gap: '.25rem', alignItems: 'start' })}>
        <h2 className={css({ textStyle: "title" })}>
          Détails d'un créatif
        </h2>
        <p className={css({ textStyle: "body" })}>L’ensemble des créations de votre créatif</p>
      </div>
    </PageHeader>
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
        <div className={hstack({ gap: "2rem", w: "100%", h: "100%", p: "1rem", alignItems: "start" })}>
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
          <div className={css({ pos: "relative", top: "-8rem", w: "1/2" })}>
            <CreativeDetailsCard creative={creative} isBookmarked={isBookmarked}/>
          </div>
        </div>
      </div>
    </>
  );
}