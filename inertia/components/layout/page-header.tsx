import { PropsWithChildren } from "react";
import { sva } from "~/styled-system/css";

type Color = 'purple' | 'blue' | 'yellow' | 'green' | 'red' | 'lightblue'
type Size = 'normal' | 'large'
interface Props extends PropsWithChildren {
  color?: Color
  size?: Size
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
      bgPosition: 'center',
      overflow: 'hidden',
      position: 'relative'
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: "start",
      width: "100%",
      p: "1rem",
    }
  },
  variants: {
    size: {
      normal: {
        container: {
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
        }
      },
      large: {
        container: {
          width: "100%"
        }
      }
    },
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
    color: "purple",
    size: "normal"
  }
})

export function PageHeader(props: Props) {
  const { children, color, size } = props 
  const classes = pageHeaderRecipe({ color, size })

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        {children}
      </div>
    </section>
  )
}