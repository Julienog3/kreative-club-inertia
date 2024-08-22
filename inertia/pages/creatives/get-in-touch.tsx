import { Head } from "@inertiajs/react";
import { GetInTouchForm } from "~/components/forms/get-in-touch-form";
import { Layout } from "~/components/layout/layout";
import { PageHeader } from "~/components/layout/page-header";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import { Category } from "~/types/category";

interface Props {
  creative: User,
  categories: Category[]
}

export default function GetInTouch(props: Props) {
  const { creative, categories } = props

  return (
    <>
      <Head title="Prise de contact" />
      <PageHeader color="lightblue">
        <Breadcrumb />
      </PageHeader>
      <section className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}>
        <Card css={{ position: "relative", w: "100%", h:"100%" }} withShadow>
          <header className={hstack({  p: "1rem", borderBottom: "solid 2px black" })}>
            {creative.avatar ? <img 
              src={creative.avatar} 
              className={css({ w: "5rem", h: "5rem", borderRadius: "8px", border: "solid 2px black", objectFit: "cover" })} 
            /> : <span className={css({ w: "5rem", h: "5rem", borderRadius: "8px", border: "solid 2px black", display: "block", bgColor: "gray" })} />}
            <div className={vstack({ alignItems: "start" })}>
              <h2 className={css({ textStyle: "subtitle" })}>Parler à {creative.firstName} de votre projet</h2>
              <p className={css({ textStyle: "body" })}>Ce formulaire a pour but de recueillir les informations nécessaires pour la compréhension et la réalisation de votre projet graphique.</p>
            </div>
          </header>
          <section className={vstack({ alignItems: "left", p: "1rem" })}>
            <GetInTouchForm creativeId={creative.id} categories={categories} />
          </section>
        </Card>
      </section>
    </>
  )
}

GetInTouch.layout = page => <Layout children={page} />