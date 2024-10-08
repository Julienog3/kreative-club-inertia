import { Head } from "@inertiajs/react"
import { css } from "~/styled-system/css"
import { hstack, vstack } from "~/styled-system/patterns"
import { User } from "~/types"
import { Breadcrumb } from "~/components/ui/breadcrumb"
import { PageHeader } from "~/components/layout/page-header"
import { BookmarksFilterForm } from "~/components/bookmarks/bookmarks-filter-form"
import { BookmarksList } from "~/components/bookmarks/bookmarks-list"
import { Layout } from "~/components/layout/layout"

interface Props {
  bookmarks: User[]
}

export default function Bookmarks(props: Props) {
  const { bookmarks } = props

  return (
    <>
      <Head title="Mes signets" />
      <PageHeader color="red">
        <Breadcrumb />
        <div className={hstack({ w: "100%", justifyContent: 'space-between' })}>
          <div className={vstack({ gap: '.25rem', alignItems: 'start' })}>
            <h2 className={css({ textStyle: "title" })}>
              Mes signets
            </h2>
            <p className={css({ textStyle: "body" })}>
              Retrouvez l'ensemble des créatifs qui vous ont tapé dans l'oeil.
            </p>
          </div>
          <BookmarksFilterForm />
        </div>
      </PageHeader>
      <section
        className={vstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
        })}
      >
        <BookmarksList bookmarks={bookmarks} />
      </section>
    </>  
  )
}

Bookmarks.layout = page => <Layout children={page} />