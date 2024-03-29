import { css } from "~/styled-system/css";
import { circle, hstack } from "~/styled-system/patterns";
import { User } from "~/types";

interface Props {
  user: User;
}

export function HeaderProfile({ user }: Props) {
  return (
    <div
      className={hstack({
        border: "2px solid black",
        rounded: "10px",
        h: "3.25rem",
        paddingX: ".5rem",
        backgroundColor: "gray",
      })}
    >
      {/* <img
        className={circle({
          w: "35px",
          h: "35px",
          objectFit: "cover",
          border: "solid 2px black",
        })}
        src={import.meta.env.VITE_API_URL.slice(0, -1) + user?.avatar}
        alt="avatar"
        loading="lazy"
      /> */}
      <p
        className={css({
          textStyle: "body",
          textTransform: "capitalize",
          mr: 4,
        })}
      >
        Bonjour{" "}
        <span
          className={css({
            fontWeight: "bold",
          })}
        >
          {user?.firstName} {user?.lastName}
        </span>
      </p>
    </div>
  );
}