import { Head, Link, usePage } from "@inertiajs/react"
import React from "react"
import { Layout } from "~/components/layout/layout"
import { PageHeader } from "~/components/layout/page-header"
import Chip from "~/components/ui/chip"
import { css } from "~/styled-system/css"
import { grid, hstack, vstack } from "~/styled-system/patterns"
import { User } from "~/types"
import GroupIcon from '~/assets/icons/group.svg?react'
import { CreativeCard } from "~/components/creatives/creative-card"

interface Props {
  creatives: User[]
}

export default function HomeAuthenticated(props: Props) {
  const { creatives } = props
  const { user } = usePage().props

  return (
    <>
      <Head title="Accueil">
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>
      <PageHeader>
        <div className={hstack({ w: "100%", justifyContent: 'space-between', my: "4rem" })}>
          <div className={vstack({ gap: '.25rem', alignItems: 'start' })}>
            <h2 className={css({ textStyle: "title" })}>
              Bienvenue {(user as User).firstName}
            </h2>
            <p className={css({ textStyle: "body" })}>
              Trouve dés aujourd’hui le créatif qui te correspondant pour ton projet. 
            </p>
            <ul className={vstack({ mt: "1.5rem" })}>
              <li>
                <Link href="/creatives">
                  <Chip><GroupIcon /> Découvrir</Chip>
                </Link>
              </li>
            </ul>
          </div>
          <img className={css({ pos: "absolute", right: "10rem", w: "40rem", top: "-3rem" })} src="/images/mascot.png" alt=""/>
        </div>
      </PageHeader>
      <section
        className={vstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
        })}
      >
        <h2 className={css({ textStyle: "subtitle", my: "1rem" })}>Les créatifs du moment</h2>
        {creatives.length >= 1 
          ? <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
            {creatives &&
              creatives.map((creative) => (
                <li key={creative.id}>
                  <CreativeCard {...creative} />
                </li>
              ))}
          </ul>
          : <span className={css({ textStyle: "body" })}>Aucun créatif n'a été trouvé.</span>
        }
      </section>
    </>
  )
}

HomeAuthenticated.layout = (page: React.ReactNode) => <Layout children={page} />