import { Head } from '@inertiajs/react'
import { Layout } from '~/components/layout/layout'
import { PageHeader } from '~/components/layout/page-header'
import { OrderDetailsCard } from '~/components/orders/order-details-card'
import { QuoteTable } from '~/components/orders/quote-table'
import { Breadcrumb } from '~/components/ui/breadcrumb'
import { css } from '~/styled-system/css'
import { hstack, vstack } from '~/styled-system/patterns'
import { Order } from '~/types/order'
import RectangleGroupIcon from '~/assets/icons/rectangle-group.svg?react'
import ListBulletIcon from '~/assets/icons/list-bullet.svg?react'


interface Props {
  order: Order
}

const breadcrumbElements = [
  {
    label: "Dashboard", 
    to: "/dashboard", 
    icon: <RectangleGroupIcon />
  },
  {
    label: 'Historique',
    to: '/history',
    icon: <ListBulletIcon />
  }
] 

export default function Index(props: Props) {
  const { order } = props

  return (
    <>
      <Head title="Détails de commande" />
      <PageHeader color="green">
        <Breadcrumb elements={breadcrumbElements} />
        <h2 className={css({ textStyle: "title" })}>
          Détails de commande
        </h2>
        <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
      </PageHeader>
      <section 
        className={hstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
          gap: "1.5rem"
        })}
      >
        <div className={vstack({ w: "100%", h: "100%", alignItems:"start", gap: "0", mt: "1rem" })}>
          <h3 className={css({ textStyle: "h3",mb: "1rem" })}>Commande {order.id}</h3>
          {order.products && order.products.length >= 1 ? <QuoteTable data={order.products} /> : <span className={css({ textStyle: "body" })}>Le devis n'a pas encore été crée.</span>}
        </div>
        <div className={vstack({ pos: "relative", top: "-7rem", w: "1/3", alignItems: "start", gap: "1rem", minWidth: "25rem" })}>
          <OrderDetailsCard userType='customer' order={order} />
        </div>
      </section>
    </>
  )
}



Index.layout = (page: React.ReactNode) => <Layout children={page} />