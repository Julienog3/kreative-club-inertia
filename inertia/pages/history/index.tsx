import { Head } from "@inertiajs/react";
import React from "react";
import { Layout } from "~/components/layout/layout";
import { PageHeader } from "~/components/layout/page-header";
import { OrdersTable } from "~/components/orders/orders-table";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { css } from "~/styled-system/css";
import { center, vstack } from "~/styled-system/patterns";
import { Order } from "~/types/order";

interface Props {
  orders: Order[]
}

export default function History(props: Props) {
  const { orders } = props

  const hasOrders = orders.length >= 1

  return (
    <>
      <Head title="Historique de commande" />
      <PageHeader color="red">
        <Breadcrumb />
        <h2 className={css({ textStyle: "title" })}>
          Historique de commande
        </h2>
        <p className={css({ textStyle: "body" })}>
          Tempus iaculis urna id volutpat lacus.
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
        {hasOrders
          ? <OrdersTable type="seller" data={orders} />
          : <div className={center({ textStyle: "body", width: "100%", height: "10rem" })}>
            Vous n'avez encore réalisé aucunes commande.
          </div>
        }
      </section>
    </>
  )
}

History.layout = (page: React.ReactNode) => <Layout children={page} />