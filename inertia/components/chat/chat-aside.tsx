import { hstack, vstack } from "~/styled-system/patterns";
import { Order, OrderRequest } from "~/types/order";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import Chip from "../ui/chip";
import { Button } from "../ui/button";
import { OrderRequestModal } from "../orders/order-modal";
import { useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { User } from "~/types";

interface Props {
  order: Order;
  orderRequest: OrderRequest;
}

export function ChatAside(props: Props) {
  const { order, orderRequest } = props 
  const { user } = usePage().props

  const isSeller = useMemo(() => {
    return (user as User).id === order.sellerId
  }, [user, order])

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <OrderRequestModal 
        orderRequest={orderRequest} 
        open={open} 
        onCancel={() => setOpen(false)} 
        onConfirm={() => setOpen(false)} 
      />
      <aside className={vstack({ borderLeft: "solid 2px black", h: "35rem", w: "1/3", p: "1rem" })}>
        <Card css={{ w: "100%" }}>
          <header
            className={hstack({
              p: ".75rem",
              borderBottom: "solid 2px black",
              textStyle: "body",
              bgColor: "yellow",
              height: "fit-content",
            })}
          >
            Commande #000
          </header>
          <div className={vstack({ p: ".75rem", alignItems: "start", textStyle: "body", w: "100%" })}>
            <ul className={vstack({ alignItems: "start", w: "100%" })}>
              <li className={hstack({ justifyContent: "space-between", w: "100%" })}>
                <p>Status</p>
                <Chip>{order.step}</Chip>
              </li>
              <li className={hstack({ justifyContent: "space-between", w: "100%" })}>
                <p>Créé le</p>
                <span className={css({ fontWeight: "bold" })}>{new Date(order.createdAt).toLocaleString()}</span>
              </li>
            </ul>
            <div>
              <h3 className={css({ textStyle: "h3" })}>Timeline</h3>
            </div>
            <div className={hstack()}>
              <Button onClick={() => setOpen(true)}>Voir la demande</Button>
              {isSeller && <Link href={`/quote/${order.id}`}>
                <Button variant="success" onClick={() => {}}>Créer le devis</Button>
              </Link>}
            </div>
          </div>
        </Card>
      </aside>
    </>
  )
}