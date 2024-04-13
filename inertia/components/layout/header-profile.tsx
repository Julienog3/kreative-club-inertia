import { css } from "~/styled-system/css";
import { hstack } from "~/styled-system/patterns";
import { User } from "~/types";
import ArrowDown from "~/assets/icons/arrow-down.svg?react"
import Chip from "../ui/chip";
import { Link } from "@inertiajs/react";
interface Props {
  user: User;
}

export function HeaderProfile({ user }: Props) {
  return (
    <div
      className={hstack({ cursor: "pointer" })}
    >
      
      <ArrowDown />
      <img
        className={css({
          borderRadius: "10px",
          w: "2.75rem",
          h: "2.75rem",
          objectFit: "cover",
          border: "solid 2px black",

        })}
        src={user?.avatar ?? ''}
        alt="avatar"
        loading="lazy"
      />
      {/* <p
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
      </p> */}
    </div>
  );
}