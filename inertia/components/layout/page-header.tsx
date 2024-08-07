import { PropsWithChildren } from "react";
import { sva } from "~/styled-system/css";

type Color = 'purple' | 'blue' | 'yellow' | 'green' | 'red' | 'lightblue'

interface Props extends PropsWithChildren {
  color?: Color
}

const pageHeaderRecipe = sva({
  slots: ['root', 'container'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      w: "100%", p: "1rem", 
      alignItems: "start", 
      borderBottom: "2px solid black",
      bgImage: 'url(/images/grid.png)',
      bgPosition: 'center'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: "start",
      width: "100%",
      maxWidth: "breakpoint-xl",
      margin: "0 auto",
      p: "1rem",
    }
  },
  variants: {
    color: {
      purple: {
        root: {
          bgColor: "purple", 
        }
      },
      blue: {
        root: {
          bgColor: "blue", 
        }
      },
      yellow: {
        root: {
          bgColor: "yellow", 
        }
      },
      green: {
        root: {
          bgColor: "green", 
        }
      },
      red: {
        root: {
          bgColor: "red", 
        }
      },
      lightblue: {
        root: {
          bgColor: "lightblue", 
        }
      }
    }
  },
  defaultVariants: {
    color: 'purple'
  }
})

export function PageHeader(props: Props) {
  const { children, color } = props 
  const classes = pageHeaderRecipe({ color })

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        {children}
      </div>
    </section>
  )
}