import Card from "~/components/ui/card";
import { Review } from "~/types/order";
import StarIcon from "~/assets/icons/star.svg?react"
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr' 

interface Props {
  review: Review
}

const reviewTitles = {}

dayjs.extend(relativeTime);
dayjs.locale('fr')

export function ReviewCard(props: Props) {
  const { review } = props

  return (
    <Card css={{ p: "1rem", gap: "1rem" }}>
      <section className={vstack({ alignItems: "start", gap: "0", w: "100%" })}>
        <h3 className={css({ textStyle: "h4" })}>Incroyable !</h3>
        <div className={hstack({ gap: "0" })}>
          {new Array(5).fill(0).map((_, index) => {
            return review.score >= index + 1 ? <StarIcon fill="#FEFFAB" /> : <StarIcon /> 
          })}
        </div>
        <p className={css({ textStyle: "body", w: "100%" })}>{review.description}</p>
      </section>
      <footer className={hstack({ borderTop: "solid 2px black", mt: "1rem", pt: "1rem" })}>
        <img
          className={css({
            borderRadius: "10px",
            w: "2.75rem",
            h: "2.75rem",
            objectFit: "cover",
            border: "solid 2px black",

          })}
          src={review.order.customer.avatar ?? ''}
          alt="avatar"
          loading="lazy"
        />
        <div className={vstack({ alignItems: "start", gap: "0", textStyle: "body" })}>
          <p className={css({ fontWeight: "bold" })}>{review.order.customer.firstName} {review.order.customer.lastName}</p>
          <span>{dayjs().to(dayjs(review.createdAt))}</span>
        </div>
      </footer>
    </Card>
  )
}