import { hstack, vstack } from "~/styled-system/patterns";
import Card from "../ui/card";
import { css } from "~/styled-system/css";
import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Transmit } from "@adonisjs/transmit-client";
import { User } from "~/types";
import Input from "../ui/input";
import { Button } from "../ui/button";
import { Order } from "~/types/order";
import { OrderRole } from "../layout/messages-layout";
import { ChatMessage } from "./chat-message";
import { ChatAside } from "./chat-aside";

interface Props {
  order: Order
}

export function Chat(props: Props) {
  const { order } = props
  const { user } = usePage().props

  const [messages, setMessages] = useState<{ message: string, username: string, sendAt: number }[]>([]) 
  const [value, setValue] = useState<string>()

  const formattedMessages = order.messages.map((message) => ({
    message: message.content,
    username: message.user.username,
    sendAt: Date.parse(message.createdAt)
  }))

  useEffect(() => {
    setMessages(formattedMessages)
  }, [])

  function getOrderRole(order: Order): OrderRole {
    return order.sellerId === (user as User).id ? 'customer' : 'seller'
  }

  const recipient = order[getOrderRole(order)]

  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: 'http://localhost:3333'
    })

    const subscription = transmit.subscription(`messages/${order.id}`)

    async function createSubscription() {
      await subscription.create()
    }

    async function deleteSubscription() {
      await subscription.delete()
    }

    const stopListening = subscription.onMessage((message: { message: string, username: string, sendAt: number }) => {
      console.log({ message })
      setMessages(messages => [message, ...messages])
    })

    createSubscription()

    return () => {
      stopListening()
      deleteSubscription()
    }
  }, [])
  
  function sendMessage() {
    setValue('')
    router.post('/messages', { message: value, orderId: order.id })
  }

  return (
    <>
      <Card withShadow>
        <header className={hstack({ p: ".75rem", borderBottom: '2px solid black' })}>
          <div className={hstack()}>
            <img
              className={css({
                borderRadius: "10px",
                w: "3.5rem",
                h: "3.5rem",
                objectFit: "cover",
                border: "solid 2px black",
              })}
              src={recipient.avatar ?? ''}
              alt="avatar"
              loading="lazy"
            />
            <div className={vstack({ gap: "0", alignItems: "start" })}>
              <h2 className={css({ textStyle: "h3" })}>{recipient.firstName} {recipient.lastName}</h2>
              <p className={css({ textStyle: "body", color: "purple" })}>@{recipient.username}</p>
            </div>
          </div>
        </header>
        <div className={hstack({ gap: "0", alignItems: "start" })}>
          <div className={vstack({ p: "1rem", alignItems: "start", justifyContent: "flex-start", h: "35rem", overflowY: "scroll", w: "100%" })}>
            <div className={vstack({ alignItems: "start", w: "100%" })}>
              {messages && <ul className={vstack({ alignItems: "start", w: "100%" })}>
                {messages.map((message) => <ChatMessage message={message}/>)}
              </ul>}
            </div>
          </div>
          <ChatAside order={order} />
        </div>
        <footer className={hstack({ p: ".75rem", borderTop: '2px solid black', background: "white" })}>
          <Input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Ecrivez votre message"/>
          <Button onClick={() => sendMessage()}>Envoyer</Button>
        </footer>
      </Card>
    </>
  )
}