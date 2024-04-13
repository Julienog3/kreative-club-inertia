import { AdminLayout } from "~/components/layout/admin-layout"

export default function General() {
  return (
    <>
      Yo tout le monde c'est squeezie
    </>
  )
}

General.layout = page => (
  <AdminLayout children={page} />
)