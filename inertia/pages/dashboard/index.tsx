import { Head, Link } from '@inertiajs/react'
import { Layout } from '~/components/layout/layout'
import { PageHeader } from '~/components/layout/page-header'
import { Breadcrumb } from '~/components/ui/breadcrumb'
import { css } from '~/styled-system/css'
import { hstack, vstack } from '~/styled-system/patterns'
import { User } from '~/types'
import { OrdersTable } from '../../components/orders/orders-table'
import { DashboardDetailsCard } from '~/components/dashboard/dashboard-details-card'
import Card from '~/components/ui/card'
import ChevronRight from '~/assets/icons/chevron-right.svg?react'
import React from 'react'


interface Props {
  creative: User
}

export default function Index(props: Props) {
  const { creative } = props

  return (
    <>
      <Head title="Dashboard" />
      <PageHeader color="green">
        <Breadcrumb />
        <h2 className={css({ textStyle: "title" })}>
          Dashboard
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
          <h3 className={css({ textStyle: "h3"})}>Mes dernières commandes</h3>
          <p className={css({ textStyle: "body", mb: "1rem" })}>Retrouvez l'historique complet de vos commandes effectués</p>
          {creative.sales ? <OrdersTable type="customer" data={creative.sales}/> : 'Aucunes'}
        </div>
        <div className={vstack({pos: "relative", top: "-7rem", w: "1/3", alignItems: "start", gap: "1rem", minWidth: "25rem" })}>
          <DashboardDetailsCard user={creative} />
          <Card css={{ w: "100%" }} withShadow>
            <ul className={vstack({ textStyle: "body", w: "100%", gap: "0" })}>
              <li className={hstack({ borderBottom: "solid 2px black", w: "100%", p: "1rem" })}>
                <Link className={css({ w: "100%", h: "100%", display: "block" })} href='/dashboard/history'>Historique de commandes</Link>
                <ChevronRight />
              </li>
              <li className={hstack({ borderBottom: "solid 2px black", w: "100%", p: "1rem" })}>
                <Link className={css({ w: "100%", h: "100%", display: "block" })} href='/dashboard/comments'>Avis reçus</Link>
                <ChevronRight />
              </li>
            </ul>
          </Card>
        </div>
      </section>
    </>
  )
}



Index.layout = (page: React.ReactNode) => <Layout children={page} />