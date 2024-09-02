import { RatingGroup as ArkRatingGroup } from "@ark-ui/react"
import StarIcon from "~/assets/icons/star.svg?react" 
import { sva } from "~/styled-system/css"

interface Props extends ArkRatingGroup.RootProps {
  label: string
}

const ratingGroupRecipe = sva({
  slots: ['root','control'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      textStyle: 'body'
    },
    control: {
      display: 'flex',
      gap: '.5rem'
    }
  } 
})

export function RatingGroup(props: Props) {
  const { label, name, ...rootProps } = props
  const classes = ratingGroupRecipe()

  return (
    <ArkRatingGroup.Root 
      count={5} 
      defaultValue={3}
      {...rootProps}
    >
      <ArkRatingGroup.Label>{label}</ArkRatingGroup.Label>
      <ArkRatingGroup.Control className={classes.control}>
        <ArkRatingGroup.Context>
          {({ items }) =>
            items.map((item) => (
              <ArkRatingGroup.Item key={item} index={item}>
                <ArkRatingGroup.ItemContext>
                  {({ highlighted }) => (highlighted ? <StarIcon fill="#FEFFAB" /> : <StarIcon />)}
                </ArkRatingGroup.ItemContext>
              </ArkRatingGroup.Item>
            ))
          }
        </ArkRatingGroup.Context>
        <ArkRatingGroup.HiddenInput />
      </ArkRatingGroup.Control>
    </ArkRatingGroup.Root>
  )
}