import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { Order } from "~/types/order";
import Chip from "~/components/ui/chip";
import { OrderTimeline } from "./order-timeline";

interface Props {
  order: Order
}

export function OrderDetailsCard(props: Props) {
  const { order } = props

  const currentStep = order.steps?.reduce((acc, curr) => {
    return new Date(curr.createdAt) > new Date(acc.createdAt) ? curr : acc;
  }, order.steps[0]);

  return (
    <Card withShadow>
      <header className={vstack({ alignItems: "start", gap: ".25rem", p: "1rem", borderBottom: "solid 2px black" })}>
        <h3 className={css({ textStyle: "h3"})}>Résumé de la commande</h3>
        <p className={css({ textStyle: "body" })}>Commande {order.id}</p>
      </header>
      <div className={vstack({ p: ".75rem", alignItems: "start", textStyle: "body", w: "100%" })}>
        <ul className={vstack({ alignItems: "start", w: "100%", gap: "1rem" })}>
          <li className={hstack({ justifyContent: "space-between", w: "100%" })}>
            <p>Status</p>
            <Chip>{currentStep?.name}</Chip>
          </li>
          <li className={hstack({ justifyContent: "space-between", w: "100%" })}>
            <p>Client</p>
            <div className={hstack()}>
              <img
                className={css({
                  borderRadius: "10px",
                  w: "2.5rem",
                  h: "2.5rem",
                  objectFit: "cover",
                  border: "solid 2px black",
                })}
                src={'http://localhost:3333' + order.customer?.avatar}
                alt="avatar"
              />
              <p>{order.customer.firstName} {order.customer.lastName}</p>
            </div>
          </li>
          <li className={hstack({ justifyContent: "space-between", w: "100%" })}>
            <p>Créé le</p>
            <span className={css({ fontWeight: "bold" })}>{new Date(order.createdAt).toLocaleString()}</span>
          </li>
        </ul>
        <div>
          <h3 className={css({ textStyle: "h3", mb: "1rem" })}>Timeline</h3>
          <OrderTimeline order={order} />
        </div>
      </div>
    </Card>
  )
}