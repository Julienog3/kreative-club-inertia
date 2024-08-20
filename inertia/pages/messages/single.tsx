import { Head, usePage } from "@inertiajs/react";
import { User } from "~/types";
import { MessagesLayout } from "~/components/layout/messages-layout";
import { Order } from "~/types/order";
import { Chat } from "~/components/chat/chat";
import { Layout } from "~/components/layout/layout";

interface Props {
  purchases: Order[],
  sales: Order[],
  order: Order
}

export default function Inbox(props: Props) {
  const { purchases, sales, order } = props
  const orders = [...purchases, ...sales]

  return (
    <>
      <Head title="Messagerie" />
      <MessagesLayout orders={orders}>
        <Chat order={order} />
      </MessagesLayout>
    </>
  )
}

Inbox.layout = page => <Layout children={page} />