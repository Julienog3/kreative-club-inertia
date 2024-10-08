import { User } from "~/types";
import Card from "../ui/card";
import { hstack, vstack } from "~/styled-system/patterns";
import { css } from "~/styled-system/css";
import Chip from "../ui/chip";
import { Button } from "../ui/button";
import { router, usePage } from "@inertiajs/react";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import BookmarkFilled from "~/assets/icons/bookmark-filled.svg?react"
import BookmarkOutline from "~/assets/icons/bookmark-outline.svg?react"
import { useEffect } from "react";

interface Props {
  creative: User
  isBookmarked: boolean
}

export function CreativeDetailsCard(props: Props) {
  const { creative, isBookmarked } = props

  const { addItem } = useSnackbarStore(store => store)

  const { user } = usePage().props

  function handleAddBookmark(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    console.log('what ?')
    router.post(`/bookmarks/${creative.id}`, {}, {
      onSuccess: () => {
        addItem({ type: "success", message: "Ajouté au signet" })
      },
      preserveScroll: true,
      only: ['bookmarks', 'creative', 'isBookmarked']
    })
  };

  useEffect(() => {
    console.log({ isBookmarked })
  }, [isBookmarked])

  function getInTouchCreative() {
    router.visit(`/creatives/${creative.username}/get-in-touch`)
  }

  return (
    <Card css={{ p: "1rem" }} withShadow>
      <header className={hstack({ gap: "1.5rem", mb: "1rem" })}>
        {creative.avatar && <img
          className={css({
            border: "solid 2px #000",
            borderRadius: "12px",
            width: "4rem",
            height: "4rem",
          })}
          src={creative.avatar}
          alt=""
        />}
        <div className={vstack({ alignItems: "left", gap: 0 })}>
          <h2 className={css({ textStyle: "subtitle" })}>
            {creative.firstName} {creative.lastName}
          </h2>
          <span className={css({ textStyle: "body", color: "purple" })}>
            @{creative.username}
          </span>
        </div>
      </header>
      <section>
        <h3 className={css({ textStyle: "h3", mb: ".5rem"  })}>A propos</h3>
        <p className={css({ textStyle: "body" })}>
          {creative.description}
        </p>
        {creative.categories && (
          <>
            <h3 className={css({ textStyle: "h3", mb: ".5rem"  })}>
              Compétences
            </h3>
            <ul className={hstack({ flexWrap: 'wrap'})}>
              {creative.categories.map((category) => {
                return (
                  <li key={category.id}>
                    <Chip>{category.title}</Chip>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </section>
      {user ? <footer className={hstack({ mt: "1rem" })}>
        <Button onClick={(e) => handleAddBookmark(e)}>
          {isBookmarked ? <BookmarkFilled />: <BookmarkOutline />} Ajouter aux signets
        </Button>
        <Button onClick={() => getInTouchCreative()} variant="success">
          Commander
        </Button>
      </footer> : ''}
    </Card>
  )
}