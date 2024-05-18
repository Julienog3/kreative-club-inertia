import { Head, router, usePage } from "@inertiajs/react";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import HomeIcon from "~/assets/icons/home.svg?react"
import { useEffect, useState } from "react";
import { Transmit } from '@adonisjs/transmit-client'
import { User } from "~/types";

const transmit = new Transmit({
    baseUrl: 'http://localhost:3333'
  })

export default function Inbox() {
  

  const subscription = transmit.subscription('globale')
  const [messages, setMessages] = useState<string[]>([]) 
  const [value, setValue] = useState<string>()
  const { props: { user } } = usePage()

  useEffect(() => {
    async function createSubscription() {
      await subscription.create()
    }

    async function deleteSubscription() {
       await subscription.delete()
    }

    subscription.onMessage(({ message }: { message: string }) => {
      console.log('onMessage triggered')
      setMessages(messages => [message, ...messages])
    })

    createSubscription()

    // return () => {
    //   stopListening()
    //   deleteSubscription()
    // }
  }, [])
  
  function sendMessage() {
    console.log('send')
    router.post('/messages', { message: value, username: (user as User).username})
  }

  return (
    <>
      <Head title="Messagerie" />
      <div
        className={vstack({
          alignItems: "start",
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
          p: "1rem",
        })}
      >
        <div className={hstack({ mb: "2.5rem" })}>
          <Chip>
            <HomeIcon /> Accueil
          </Chip>
          <Chip>Messagerie</Chip>
        </div>
        <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
          Messagerie
        </h2>
        {messages && <ul>
          {messages.map((message) => <li>{message}</li>)}
        </ul>}
        <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
        <button onClick={() => sendMessage()}>Envoyer</button>
      </div>
    </>
  )
}