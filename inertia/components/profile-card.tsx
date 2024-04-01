import { User } from "~/types";
import Card from "./ui/card";
import { circle, hstack, vstack } from "~/styled-system/patterns";
import { css } from "~/styled-system/css";


interface Props {
  user: User;
}

export const ProfileCard = ({ user }: Props) => {
  return (
    <Card css={{ backgroundColor: "gray", w: "100%", p: "1rem" }}>
      <div className={hstack({ maxH: "10rem", gap: "2rem" })}>
        <img
          className={circle({
            border: "2px solid black",
            w: "6rem",
            h: "6rem",
            objectFit: "cover",
          })}
          src={import.meta.env.BASE_URL + user?.avatar}
          alt="avatar"
        />
        <div
          className={vstack({ textStyle: "body", alignItems: "start", gap: 0 })}
        >
          <p className={css({ textStyle: "subtitle" })}>
            {user.firstName} {user.lastName}
          </p>
          <span className={css({ color: "purple" })}>@{user.username}</span>
        </div>
      </div>
    </Card>
  );
};
