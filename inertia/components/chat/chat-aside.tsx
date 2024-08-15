import { hstack, vstack } from "~/styled-system/patterns";
import { Order } from "~/types/order";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import Chip from "../ui/chip";

interface Props {
  order: Order
}

export function ChatAside(props: Props) {
  const { order } = props 

  return (
    <aside className={vstack({ borderLeft: "solid 2px black", h: "35rem", w: "1/3", p: "1rem" })}>
      <Card css={{ w: "100%" }}>
        <div
          className={hstack({
            p: ".75rem",
            borderBottom: "solid 2px black",
            textStyle: "body",
            bgColor: "yellow",
            height: "fit-content",
          })}
        >
          Commande #000
        </div>
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
        </div>
      </Card>
    </aside>
  )
}