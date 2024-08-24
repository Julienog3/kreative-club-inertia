import { Head, usePage } from "@inertiajs/react";
import { User } from "~/types";
import { MessagesLayout } from "~/components/layout/messages-layout";
import { Order } from "~/types/order";
import { Chat } from "~/components/chat/chat";
import { Layout } from "~/components/layout/layout";
import OrderRequest from "#models/order_request";

interface Props {
  purchases: Order[],
  sales: Order[],
  order: Order,
  orderRequest: OrderRequest
}

export default function Inbox(props: Props) {
  const { purchases, sales, order, orderRequest } = props
  const orders = [...purchases, ...sales]

  return (
    <>
      <Head title="Messagerie" />
      <MessagesLayout orders={orders}>
        <Chat order={order} orderRequest={orderRequest} />
      </MessagesLayout>
    </>
  )
}

Inbox.layout = page => <Layout children={page} />