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
  'payment-done': {
    awaiting: 'Paiement en attente',
    done: 'Paiement effectué le'
  },
  'files-sended': {
    awaiting: 'Envoi des fichiers en attente',
    done: 'Fichiers envoyés le'
  },
  'order-validated': {
    awaiting: 'Validation de la commande en attente',
    done: 'Commande validé le'
  },
  'review-submitted': {
    awaiting: 'Commentaire en attente',
    done: 'Commentaire envoyé le'
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
    <ul className={vstack({ alignItems: "start", gap: "1rem" })}>
      {Object.entries(steps).map(([key, value]) => (
        <li key={key} className={hstack({ alignItems: "center" })}>
          {isDone(key) 
            ? <span className={circle({ border: "solid 2px black", backgroundColor: "green", w: "2rem", h: "2rem" })}>✓</span>
            : <span className={circle({ border: "dashed 2px black", backgroundColor: "gray", w: "2rem", h: "2rem" })}>?</span>
          }
          {isDone(key) ? `${value.done} ${dateWhenDone(key)}` : value.awaiting} 
        </li>
      ))}
    </ul>
  )
}