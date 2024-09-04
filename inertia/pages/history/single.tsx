import { Head } from "@inertiajs/react";
import React from "react";
import { Layout } from "~/components/layout/layout";
import { PageHeader } from "~/components/layout/page-header";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { Order } from "~/types/order";
import ListBulletIcon from '~/assets/icons/list-bullet.svg?react'
import { QuoteTable } from "~/components/orders/quote-table";
import { OrderDetailsCard } from "~/components/orders/order-details-card";


interface Props {
  order: Order
}

const breadcrumbElements = [
  {
    label: 'Historique',
    to: '/history',
    icon: <ListBulletIcon />
  }
] 

export default function Single(props: Props) {
  const { order } = props

  return (
    <>
      <Head title="Détails de commande" />
      <PageHeader color="red">
        <Breadcrumb elements={breadcrumbElements} />
        <h2 className={css({ textStyle: "title" })}>
          Historique de commande
        </h2>
        <p className={css({ textStyle: "body" })}>
          Tempus iaculis urna id volutpat lacus.
        </p>
      </PageHeader>
      <section 
        className={hstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
          gap: "1.5rem"
        })}
      >
        <div className={vstack({ w: "100%", h: "100%", alignItems:"start", gap: "0", mt: "1rem" })}>
          <h3 className={css({ textStyle: "h3",mb: "1rem" })}>Commande {order.id}</h3>
          {order.products && <QuoteTable data={order.products} />}
        </div>
        <div className={vstack({ pos: "relative", top: "-7rem", w: "1/3", alignItems: "start", gap: "1rem", minWidth: "25rem" })}>
          <OrderDetailsCard userType="seller" order={order} />
        </div>
      </section>
    </>
  )
}

Single.layout = (page: React.ReactNode) => <Layout children={page} />