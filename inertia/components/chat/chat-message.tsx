import { usePage } from "@inertiajs/react";
import { sva } from "~/styled-system/css";
import { User } from "~/types";

interface Props {
  message: { message: string, username: string, sendAt: number }
}

const chatMessageRecipe = sva({
  slots: ['container', 'content', 'date'],
  base: {
    container: {
      display: 'flex',
      gap: ".5rem",
      flexDir: 'column',
      w: '100%',
      textStyle: 'body', 
    },
    date: {
      w: 'fit-content'
    },
    content: {
      p: '.5rem', 
      border: 'solid 2px black', 
      borderRadius: '5px', 
      background: 'gray', 
      maxW: "1/3",
      w: 'fit-content',
      wordBreak: 'break-all'
    }
  },
  variants: {
    isSelfMessage: {
      true: {
        content: {
          background: 'purple', 
          marginLeft: 'auto'
        },
        date: {
          marginLeft: 'auto'
        }
      }
    }
  }
})

export function ChatMessage(props: Props) {
  const { message } = props
  const { user } = usePage().props

  const isSelfMessage = (user as User).username === message.username
  const styles = chatMessageRecipe({ isSelfMessage })

  return (
    <li className={styles.container}>
      <span className={styles.content}>
        {message.message}
      </span>
      <p className={styles.date}>{new Date(message.sendAt).toLocaleString()}</p>
    </li>
  )
}