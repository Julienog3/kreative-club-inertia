import { Link } from "@inertiajs/react";
import { css } from "~/styled-system/css";
import { center, hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import Chip from "../ui/chip";

interface Props {
  user: User
}

export const Sidebar = (props: Props) => {
  const { user } = props

  return (
    <aside
      className={vstack({
        bgColor: "black",
        color: "white",
        minH: "screen",
        width: "18rem",
        pos: "fixed",
        textStyle: "body",
        alignItems: "start",
        // p: "1rem",
      })}
    >
      <div className={center({ h: "5rem", pl: "1rem" })}>
        <h2 className={css({ fontSize: "1.25rem" })}>Administration</h2>
      </div>
      <div className={vstack({ p: "1rem", alignItems: "start", width: "100%" })}>
        <h3 className={css({ textStyle: "body", color: "grayText" })}>Menu</h3>
        <ul className={vstack({ w: "100%", alignItems: "start" })}>
          <li className={css({ w: "100%" })}>
            <Link
              className={css({
                p: ".75rem",
                w: "100%",
                h: "100%",
                borderRadius: "10px",
                display: "block",
                transition: ".5s all",
                _hover: {
                  bgColor: "grayText"
                }
              })}
              href="/admin/general"
            >
              <div className={hstack()}>
                Général
              </div>
            </Link>
          </li>
          <li className={css({ w: "100%" })}>
            <Link
              className={css({
                p: ".75rem",
                w: "100%",
                h: "100%",
                borderRadius: "10px",
                display: "block",
                transition: ".5s all",
                _hover: {
                  bgColor: "grayText"
                }
              })}
              href="/admin/users"
            >
              <div className={hstack()}>
                Utilisateurs
              </div>
            </Link>
          </li>
          <li className={css({ w: "100%" })}>
            <Link
              className={css({
                p: ".75rem",
                w: "100%",
                h: "100%",
                borderRadius: "10px",
                display: "block",
                transition: ".5s all",
                _hover: {
                  bgColor: "grayText"
                }
              })}
              href="/admin/categories"
            >
              <div className={hstack()}>
                Catégories
              </div>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className={hstack({ mt: "auto", p: "1rem"})}>
        <img
          className={css({
            borderRadius: "10px",
            w: "2.75rem",
            h: "2.75rem",
            objectFit: "cover",
          })}
          src={(user as User)?.avatar ?? ''}
          alt="avatar"
          loading="lazy"
        />
        <p>{user.firstName} {user.lastName}</p>
      </div>
    </aside>
  );
};
