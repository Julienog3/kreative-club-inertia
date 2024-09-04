import { User } from "~/types"
import Card from "../ui/card"
import { css } from "~/styled-system/css"
import { center, hstack, vstack } from "~/styled-system/patterns"
import StarIcon from "~/assets/icons/star.svg?react"
import { useEffect } from "react"

interface Props {
  user: User
}

export function DashboardDetailsCard(props: Props) {
  const { user } = props

  useEffect(() => {

  }, [])

  return (
    <Card css={{ p: "1rem", w: "100%" }} withShadow>
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
        <div className={hstack()}>
          <div className={hstack({ gap: "0" })}>
            {new Array(5).fill(0).map((_, index) => {
              return 3 >= index + 1 ? <StarIcon fill="#FEFFAB" /> : <StarIcon /> 
            })}
          </div>
          <p className={css({ textStyle: "body" })}>4,2 sur 8 avis</p>
        </div>
        <div className={hstack({ width: "100%" })}>
          <div className={vstack({ gap: "0", w: "100%", border: "solid 2px #000", p: "1rem", borderRadius: "10px", alignItems: "center" })}>
            <span className={css({ textStyle: "h4" })}>{user.sales?.length}</span>
            <p className={css({ textStyle: "body", fontSize: "small", textAlign: "center" })}>Commandes réalisés</p>
          </div>
          <div className={vstack({ gap: "0", w: "100%", border: "solid 2px #000", p: "1rem", borderRadius: "10px", alignItems: "center" })}>
            <span className={css({ textStyle: "h4" })}>0</span>
            <p className={css({ textStyle: "body", fontSize: "small", textAlign: "center" })}>Argent récoltés</p>
          </div>
        </div>
      </div>
    </Card>
  )
}