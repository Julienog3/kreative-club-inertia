import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns"
import { Breadcrumb } from "~/components/ui/breadcrumb"
import { PropsWithChildren } from "react"
import { css } from "~/styled-system/css"
import { Link, usePage } from "@inertiajs/react"
import List from "~/components/ui/list"
import { Order } from "~/types/order"
import { User } from "~/types"

interface Props extends PropsWithChildren {
  orders: Order[]
}

export type OrderRole = 'seller' | 'customer'

export function MessagesLayout(props: Props) {
  const { orders, children } = props

  const { user } = usePage().props

  function getOrderRole(order: Order): OrderRole {
    return order.seller.id === (user as User).id ? 'customer' : 'seller'
  }
  
  return (
    <section className={vstack({ alignItems: "start", w: "100%", h: "screen", p: "2rem" })}>
      <Breadcrumb />
      <div className={grid({ columns: 5, gap: "1rem", w: "100%" })}>
        <div
          className={vstack({
            width: "100%",
            position: "sticky",
            top: "1rem",
            gap: "1rem",
          })}
        >
          <List>
            <List.Header>Mes commandes</List.Header>
            {orders.map((order) => {
              return (
                <List.Item>
                  <Link
                    className={css({
                      p: "1rem",
                      w: "100%",
                      h: "100%",
                      display: "block",
                    })}
                    href={`/inbox/${order.id}`}
                    key={order.id}
                  >
                    <div className={hstack()}>
                      <img
                        className={css({
                          borderRadius: "10px",
                          w: "2.75rem",
                          h: "2.75rem",
                          objectFit: "cover",
                          border: "solid 2px black",
                        })}
                        src={order[getOrderRole(order)]?.avatar ?? ''}
                        alt="avatar"
                        loading="lazy"
                      />
                      <p className={css({ textStyle: "body" })}>{order[getOrderRole(order)].firstName} {order[getOrderRole(order)].lastName}</p>
                    </div>
                  </Link>
                </List.Item>
              )
            })}
            
          </List>
        </div>
        <div className={gridItem({ colSpan: 4 })}>
          {children}
        </div>
      </div>
    </section>
  )
}