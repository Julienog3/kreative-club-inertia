import { Link } from "@inertiajs/react";
import React from "react";
import HomeIcon from "~/assets/icons/home.svg?react"
import { hstack } from "~/styled-system/patterns";
import Chip from "./chip";

type Element = { label: string; to: string, icon?: React.ReactNode }

interface Props {
  elements?: Element[]
}

export function Breadcrumb(props: Props) {
  const { elements = [] } = props

  const elementsWithHome: Element[] = [
    {
      label: "Retourner à l'accueil", 
      to: '/',
      icon: <HomeIcon />
    },
    ...elements
  ]

  return (
    <ul className={hstack({ mb: "2.5rem" })}>
      {elementsWithHome.map((element, index) => <li key={index}>
        <Link href={element.to}>
          <Chip>{element.icon} {element.label}</Chip>
        </Link>
      </li>)}
    </ul>
  )
}