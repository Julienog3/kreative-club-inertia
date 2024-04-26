import { Link, router, usePage } from "@inertiajs/react";
import { css } from "~/styled-system/css";
import Card from "../ui/card";
import { hstack, vstack } from "~/styled-system/patterns";
import { Button } from "../ui/button";
import BookmarkFilled from "~/assets/icons/bookmark-filled.svg?react"
import BookmarkOutline from "~/assets/icons/bookmark-outline.svg?react"
import { User } from "~/types";
import Chip from "../ui/chip";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { useEffect } from "react";

interface Props extends User {}

export function CreativeCard(props: Props) {
  const { username, avatar, portfolioImageAsThumbnail } = props

  const { props: { user } } = usePage()
  const { addItem } = useSnackbarStore(state => state)

  useEffect(() => {console.log((user as User))}, [])

  // const isBookmarked = (user as User).bookmarks!.find(({ creativeId }) => creativeId === props.id)
  const isBookmarked = false


  function handleAddBookmark(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    router.post(`/bookmarks/${props.id}`, {}, {
      onSuccess: () => {
        addItem({ type: "success", message: "Bookmarked"})
      },
      only: ['creatives']
    })
  };

  return (
    <Link
      href={`/creatives/${username}`}
      className={css({ borderRadius: "13px" })}
    >
      <Card css={{ p: "1rem" }}>
        <div className={vstack({ alignItems: "start" })}>
          <div className={css({ position: "relative", width: "100%" })}>
            <div
              className={css({
                position: "absolute",
                zIndex: 5,
                top: "1rem",
                right: "1rem",
              })}
            >
              <Button variant="danger" onClick={(e) => handleAddBookmark(e)}>
                {isBookmarked ? <BookmarkFilled />: <BookmarkOutline />}
              </Button>
            </div>
            {portfolioImageAsThumbnail && <img
              className={css({
                position: "relative",
                borderRadius: "15px",
                border: "solid 2px #000",
                w: "100%",
                h: "14rem",
                objectFit: "cover",
                zIndex: "3",
              })}
              src={portfolioImageAsThumbnail.image ?? ''}
              alt=""
            />}
          </div>
          <div className={vstack({ alignItems: "start" })}>
            {props.categories && props.categories.length > 0 && (
              <div className={hstack({ gap: ".25rem", flexWrap: "wrap" })}>
                {props.categories.map(({ id, title }) => (
                  <Chip key={id}>{title}</Chip>
                ))}
              </div>
            )}
            <p className={css({ textStyle: "body" })}>
              {props.description}
            </p>
            <span
              className={css({ w: "100%", h: "2px", background: "black" })}
            />
            <div
              className={hstack({
                alignItems: "center",
              })}
            >
              {avatar && <img
                className={css({
                  border: "solid 2px #000",
                  borderRadius: "12px",
                  width: "3rem",
                  height: "3rem",
                })}
                src={avatar}
                alt=""
              />}
              <div className={vstack({ gap: "0", alignItems: "start" })}>
                <h2
                  className={css({
                    textStyle: "body",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  })}
                >
                  {props.firstName} {props.lastName}
                </h2>
                <span
                  className={css({
                    textStyle: "body",
                    fontSize: ".85rem",
                    color: "purple",
                  })}
                >
                  @{props.username}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}