import { Head, usePage } from "@inertiajs/react";
import { User } from "~/types";
import { MessagesLayout } from "~/components/layout/messages-layout";
import { Order } from "~/types/order";
import { Chat } from "~/components/chat/chat";

interface Props {
  purchases: Order[],
  sales: Order[],
  order: Order
}

export default function Inbox(props: Props) {
  const { props: { user } } = usePage()
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