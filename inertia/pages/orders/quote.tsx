import { Head } from "@inertiajs/react"
import React from "react"
import { ConfirmContextProvider } from "~/components/layout/confirm-context"
import { Layout } from "~/components/layout/layout"
import { PageHeader } from "~/components/layout/page-header"
import { OrderQuoteForm } from "~/components/orders/order-quote-form"
import { Breadcrumb } from "~/components/ui/breadcrumb"
import { css } from "~/styled-system/css"
import { vstack } from "~/styled-system/patterns"
import { Order } from "~/types/order"

interface Props {
  order: Order
}

export default function Quote(props: Props) {
  const { order } = props

  return (
    <>
      <Head title="Création du devis" />
      <PageHeader>
        <Breadcrumb />
        <h2 className={css({ textStyle: "title" })}>Création du devis</h2>
        <p className={css({ textStyle: "body" })}>Créer votre dès maintenant.</p>
      </PageHeader>
      <section
        className={vstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
          mt: "1rem"
        })}
      >
        <OrderQuoteForm order={order}/> 
      </section>
    </>
  )
}

Quote.layout = (page: React.ReactNode) => (
  <ConfirmContextProvider>
    <Layout children={page} />
  </ConfirmContextProvider>
) 