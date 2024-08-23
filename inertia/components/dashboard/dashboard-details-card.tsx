import { User } from "~/types"
import Card from "../ui/card"
import { css } from "~/styled-system/css"
import { vstack } from "~/styled-system/patterns"

interface Props {
  user: User
}

export function DashboardDetailsCard(props: Props) {
  const { user } = props

  return (
    <Card css={{ p: "1rem" }} withShadow>
      <div className={vstack({ gap: "1rem" })}>
        {user.avatar && <img
          className={css({
            border: "solid 2px #000",
            borderRadius: "12px",
            width: "6rem",
            height: "6rem",
          })}
          src={user.avatar}
          alt=""
        />}
        <div className={vstack({ gap: "0" })}>
          <h3 className={css({ textStyle: "subtitle" })}>{user.lastName} {user.firstName}</h3>
          <p className={css({ textStyle: "body", color: "purple" })}>@{user.username}</p>
        </div>
      </div>
    </Card>
  )
}