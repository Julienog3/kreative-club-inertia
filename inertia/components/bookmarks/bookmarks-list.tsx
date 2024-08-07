import { grid } from "~/styled-system/patterns";
import { User } from "~/types";
import { CreativeCard } from "../creatives/creative-card";
import { css } from "~/styled-system/css";

interface Props {
  bookmarks: User[]
}

export function BookmarksList(props: Props) {
  const { bookmarks } = props

  return (
    <ul className={grid({ columns: { lg: 3, md: 2, base: 1 }, h: "100%", gap: "1.5rem" })}>
      {bookmarks ?
        bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <CreativeCard {...bookmark} />
          </li>
        )) : <p className={css({ textStyle: 'body' })}>Vous n'avez encore aucun créatif mis en signet</p>}
    </ul>
  )
}