import { Step } from "#models/order_step"
import { circle, hstack, vstack } from "~/styled-system/patterns"
import { Order } from "~/types/order"

interface Props {
  order: Order
}

const steps: Record<Step, {
  awaiting: string,
  done: string
}> = {
  pending: {
    awaiting: 'Commande en attente',
    done: 'Commmande crée le'
  },
  'quote-created': {
    awaiting: 'Devis en attente',
    done: 'Devis crée le'
  },
  'quote-validated': {
    awaiting: 'Validation du devis en attente',
    done: 'Devis validé le'
  },
  'in-progress': {
    awaiting: '',
    done: ''
  },
  'done': {
    awaiting: '',
    done: ''
  },
  'not-started': {
    awaiting: '',
    done: ''
  }
}

export function OrderTimeline(props: Props) {
  const { order } = props

  function isDone(orderName: string) {
    return !!order.steps?.find(({ name }) => name === orderName)
  }

  function dateWhenDone(orderName: string) {
    const step = order.steps?.find(({ name }) => name === orderName)

    if (!step?.createdAt) return
    return new Date(step?.createdAt).toLocaleString()
  }

  return (
    <ul className={vstack({ alignItems: "start" })}>
      {Object.entries(steps).map(([key, value]) => (
        <li key={key} className={hstack()}>
          {isDone(key) 
            ? <span className={circle({ border: "solid 2px black", backgroundColor: "green", w: "2rem", h: "2rem" })}>✓</span>
            : <span className={circle({ border: "dashed 2px black", backgroundColor: "gray", w: "2rem", h: "2rem" })}>?</span>
          }
          {isDone(key) ? `${value.done} ${dateWhenDone(key)}` : value.awaiting} 
        </li>
      ))}
      {/* {order.steps?.map((step) => (
        <li key={step.id}>
          <span className={circle({ border: "solid 2px black", backgroundColor: "green", w: "2rem", h: "2rem" })}>✓</span>
        </li>
      ))} */}
    </ul>
  )
}