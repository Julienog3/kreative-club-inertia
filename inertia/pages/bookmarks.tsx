import { Head } from "@inertiajs/react"
import { CreativeCard } from "~/components/creatives/creative-card"
import Chip from "~/components/ui/chip"
import { css } from "~/styled-system/css"
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns"
import { User } from "~/types"
import HomeIcon from "~/assets/icons/home.svg?react"

interface Props {
  bookmarks: User[]
}

export default function Bookmarks(props: Props) {
  const { bookmarks } = props

  function submit(e) {
  
  }

  return (
    <>
      <Head title="Mes signets" />
      <div
        className={vstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
        })}
      >
        <div className={hstack({ mb: "2.5rem" })}>
          <Chip>
            <HomeIcon /> Accueil
          </Chip>
          <Chip>Mes signets</Chip>
        </div>
        <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
          Mes signets
        </h2>
        <div className={vstack()}>
            <form
              onSubmit={submit}
              className={grid({ gap: "1rem", columns: 2, w: "100%" })}
            >
              <div className={gridItem({ colSpan: 2 })}>
                {/* <Controller
                  control={control}
                  name="categories"
                  render={({ field }) => <Autocomplete {...field} />}
                /> */}
              </div>
            </form>
        </div>
        <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
          {bookmarks &&
            bookmarks.map((bookmark) => (
              <li key={bookmark.id}>
                <CreativeCard {...bookmark} />
              </li>
            ))}
        </ul>
      </div>
    </>  
  )
}