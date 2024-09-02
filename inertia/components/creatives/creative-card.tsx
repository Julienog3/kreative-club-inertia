import { Link, router } from "@inertiajs/react";
import { css } from "~/styled-system/css";
import Card from "~/components/ui/card";
import { hstack, vstack } from "~/styled-system/patterns";
import { Button } from "../ui/button";
import BookmarkFilled from "~/assets/icons/bookmark-filled.svg?react"
import BookmarkOutline from "~/assets/icons/bookmark-outline.svg?react"
import { User } from "~/types";
import Chip from "../ui/chip";
import { useSnackbarStore } from "../ui/snackbar/snackbar.store";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

interface Props extends User {}

export function CreativeCard(props: Props) {
  const { username, avatar, portfolioImageAsThumbnail, isBookmarked } = props

  const { addItem } = useSnackbarStore(state => state)

  function handleAddBookmark(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    router.post(`/bookmarks/${props.id}`, {}, {
      onSuccess: () => {
        addItem({ type: "success", message: "Bookmarked"})
      },
      preserveScroll: true,
      only: ['creatives', 'bookmarks']
    })
  };

  const [isCardHovered, setIsCardHovered] = useState<boolean>(false);

  const buttonStyle = useSpring({
    opacity: isCardHovered ? "1" : "0",
    transform: isCardHovered ? "scale(1)" : "scale(0)",
  });

  const hasThumbnail = !!portfolioImageAsThumbnail[0]

  return (
    <Link
      href={`/creatives/${username}`}
      className={css({ borderRadius: "13px" })}
    >
      <Card 
        css={{ p: "1rem" }}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}

      >
        <div className={vstack({ alignItems: "start" })}>
          <div className={css({ position: "relative", width: "100%" })}>
            <animated.div
              style={buttonStyle}
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
            </animated.div>
            {hasThumbnail 
              ? <img
                className={css({
                  position: "relative",
                  borderRadius: "15px",
                  border: "solid 2px #000",
                  w: "100%",
                  h: "14rem",
                  objectFit: "cover",
                  zIndex: "2",
                })}
                src={portfolioImageAsThumbnail[0]?.image ?? ''}
                alt=""
              />
              : <span className={css({
                display: "block",
                position: "relative",
                background: "gray",
                borderRadius: "15px",
                border: "solid 2px #000",
                w: "100%",
                h: "14rem",
                objectFit: "cover",
              })}/>
            }
          </div>
          <div className={vstack({ alignItems: "start", w: "100%" })}>
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