import { Head, Link, router, usePage } from "@inertiajs/react";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import HomeIcon from "~/assets/icons/home.svg?react"
import { useEffect, useState } from "react";
import { User } from "~/types";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { Transmit } from "@adonisjs/transmit-client";
import List from "~/components/ui/list";
import { Breadcrumb } from "~/components/ui/breadcrumb";
import { MessagesLayout } from "~/components/layout/messages-layout";
import { Order } from "~/types/order";

interface Props {
  purchases: Order[]
  sales: Order[]
}

export default function Inbox(props: Props) {
  const [value, setValue] = useState<string>()
  const { props: { user } } = usePage()
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