import { hstack, vstack } from "~/styled-system/patterns";
import { Order, OrderRequest } from "~/types/order";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import Chip from "../ui/chip";
import { Button } from "../ui/button";
import { OrderRequestModal } from "../orders/order-modal";
import { useMemo, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { User } from "~/types";
import { OrderTimeline } from "../orders/order-timeline";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";

interface Props {
  order: Order;
  orderRequest: OrderRequest;
}

export function ChatAside(props: Props) {
  const { order, orderRequest } = props 
  const { user } = usePage().props

  const { addItem } = useSnackbarStore(state => state)

  const currentStep = order.steps?.reduce((acc, curr) => {
    return new Date(curr.createdAt) > new Date(acc.createdAt) ? curr : acc;
  }, order.steps[0]);

  const isSeller = useMemo(() => {
    return (user as User).id === order.sellerId
  }, [user, order])

  const isCustomer = useMemo(() => {
    return (user as User).id === order.customerId
  }, [user, order])

  async function validateQuote() {
    await router.post(`/orders/${order.id}/steps`, {
      name: 'quote-validated'
    }, {
      onSuccess: () => {
        addItem({
          type: 'success',
          message: 'Le devis a bien été validé !'
        })
      },
      only: ['order'],
      preserveScroll: true
    })
  }

  

  const displayCreateQuoteAction = isSeller && currentStep?.name === 'pending'
  const displayValidateQuoteAction = isCustomer && currentStep?.name === 'quote-created'

  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <OrderRequestModal 
        orderRequest={orderRequest} 
        open={open} 
        onCancel={() => setOpen(false)} 
        onConfirm={() => setOpen(false)} 
      />
      <aside className={vstack({ borderLeft: "solid 2px black", h: "35rem", w: "1/3", minWidth: "25rem", p: "1rem" })}>
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
                <Chip>{currentStep?.name}</Chip>
              </li>
              <li className={hstack({ justifyContent: "space-between", w: "100%" })}>
                <p>Créé le</p>
                <span className={css({ fontWeight: "bold" })}>{new Date(order.createdAt).toLocaleString()}</span>
              </li>
            </ul>
            <div>
              <h3 className={css({ textStyle: "h3" })}>Timeline</h3>
              <OrderTimeline order={order} />
            </div>
            <div className={hstack()}>
              <Button onClick={() => setOpen(true)}>Voir la demande</Button>
              <Button onClick={() => {}}>Voir les détails</Button>
              {displayCreateQuoteAction && <Link href={`/quote/${order.id}`}>
                <Button variant="success" onClick={() => {}}>Créer le devis</Button>
              </Link>}
              {displayValidateQuoteAction && <Button variant="success" onClick={validateQuote}>
                Valider le devis
              </Button>}
            </div>
          </div>
        </Card>
      </aside>
    </>
  )
}