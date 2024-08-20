import { Head } from "@inertiajs/react";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import Card from "~/components/ui/card";
import { MessagesLayout } from "~/components/layout/messages-layout";
import { Order } from "~/types/order";
import { Layout } from "~/components/layout/layout";

interface Props {
  purchases: Order[]
  sales: Order[]
}

export default function Inbox(props: Props) {
  const { purchases, sales } = props
  const orders = [...purchases, ...sales]

  return (
    <>
      <Head title="Messagerie" />
      <MessagesLayout orders={orders}>
        <Card withShadow>
          <div className={vstack({ p: "1rem", alignItems: "start" })}>
            <h2 className={css({ textStyle: "subtitle" })}>Messagerie</h2>
          </div>
        </Card>
      </MessagesLayout>
    </>
  )
}

Inbox.layout = page => <Layout children={page} />