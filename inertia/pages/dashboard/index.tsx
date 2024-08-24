import { Head } from '@inertiajs/react'
import { Layout } from '~/components/layout/layout'
import { PageHeader } from '~/components/layout/page-header'
import { Breadcrumb } from '~/components/ui/breadcrumb'
import { css } from '~/styled-system/css'
import { hstack, vstack } from '~/styled-system/patterns'
import { User } from '~/types'
import { OrdersTable } from '../orders/orders-table'
import { DashboardDetailsCard } from '~/components/dashboard/dashboard-details-card'

interface Props {
  creative: User
}

export default function Index(props: Props) {
  const { creative } = props
      
  console.log({ creative })

  return (
    <>
      <Head title="Dashboard" />
      
      <PageHeader color="green" size="large">
        <Breadcrumb />
        <h2 className={css({ textStyle: "title" })}>
          Dashboard
        </h2>
        <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
      </PageHeader>
      <section className={hstack({ alignItems: "start", gap: "0", p: "2rem" })}>
        <div className={vstack({ w: "100%", h: "100%", alignItems:"start", gap: "0" })}>
          <h3 className={css({ textStyle: "h3"})}>Mes dernières commandes</h3>
          <p className={css({ textStyle: "body", mb: "1rem" })}>Retrouvez l'historique complet de vos commandes effectués</p>
          {creative.sales ? <OrdersTable data={creative.sales}/> : 'Aucunes'}
        </div>
        <div className={css({ pos: "relative", top: "-8rem", w: "1/3" })}>
          <DashboardDetailsCard user={creative} />
        </div>
      </section>
    </>
  )
}



Index.layout = page => <Layout children={page} />