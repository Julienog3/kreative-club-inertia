import { Head } from "@inertiajs/react";
import React from "react";
import { Layout } from "~/components/layout/layout";
import { PageHeader } from "~/components/layout/page-header";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import RectangleGroupIcon from '~/assets/icons/rectangle-group.svg?react'


const breadcrumbElements = [
  {
    label: "Dashboard", 
    to: "/dashboard", 
    icon: <RectangleGroupIcon />
  }
] 

export default function Reviews() {
  return (
    <>
      <Head title="Avis reçus" />
      <PageHeader color="green">
        <Breadcrumb elements={breadcrumbElements}/>
        <h2 className={css({ textStyle: "title" })}>
          Avis reçus
        </h2>
        <p className={css({ textStyle: "body" })}>
          Retrouvez l'ensemble des avis reçus.
        </p>
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
        .
      </section>
    </>
  )
}

Reviews.layout = (page: React.ReactNode) => <Layout children={page} />