import { Head, Link, router, usePage } from "@inertiajs/react";
import { css } from "~/styled-system/css";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import { useEffect, useState } from "react";
import { User } from "~/types";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { Transmit } from "@adonisjs/transmit-client";
import List from "~/components/ui/list";

interface Props {
  recipient: User
}

export default function Inbox(props: Props) {
  const [messages, setMessages] = useState<string[]>([]) 
  const [value, setValue] = useState<string>()
  const { props: { user } } = usePage()
  const { purchases, recipient } = props

  useEffect(() => {
    const transmit = new Transmit({
      baseUrl: 'http://localhost:3333'
    })

    const subscription = transmit.subscription(`messages/${recipient.username}`)

    async function createSubscription() {
      await subscription.create()
    }

    async function deleteSubscription() {
      await subscription.delete()
    }

    const stopListening = subscription.onMessage(({ message }: { message: string }) => {
      setMessages(messages => [message, ...messages])
    })

    createSubscription()

    return () => {
      stopListening()
      deleteSubscription()
    }
  }, [])

  
  
  function sendMessage() {
    router.post('/messages', { message: value, username: recipient.username })
  }

  return (
    <>
      <Head title="Messagerie" />
      <div
        className={vstack({
          minHeight: "100vh",
          width: "100%",
          maxWidth: "breakpoint-xl",
          margin: "0 auto",
        })}
      >
        <div className={grid({ columns: 4, gap: "1rem", w: "100%", p: "1rem" })}>
          <div
            className={vstack({
              width: "100%",
              position: "sticky",
              top: "1rem",
              gap: "1rem",
            })}
          >
            <List>
              <List.Header>Mes messages</List.Header>
              {purchases.map((purchase: any) => {
                return (
                  <List.Item>
                    <Link
                      className={css({
                        p: "1rem",
                        w: "100%",
                        h: "100%",
                        display: "block",
                      })}
                      href={`/inbox/${purchase.seller.username}`}
                      key={purchase.id}
                    >
                      <div className={hstack()}>
                        <img
                          className={css({
                            borderRadius: "10px",
                            w: "2.75rem",
                            h: "2.75rem",
                            objectFit: "cover",
                            border: "solid 2px black",
                          })}
                          src={purchase.seller?.avatar ?? ''}
                          alt="avatar"
                          loading="lazy"
                        />
                        <p className={css({ textStyle: "body" })}>{purchase.seller.firstName} {purchase.seller.lastName}</p>
                      </div>
                    </Link>
                  </List.Item>
                )
              })}
              
            </List>
          </div>
          <div className={gridItem({ colSpan: 3 })}>
            <Card>
              <div className={vstack({ p: "1rem", alignItems: "start" })}>
                <div className={vstack({ gap: "0",  w: "100%" })}>
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
                  <h2 className={css({ textStyle: "title" })}>{recipient.firstName} {recipient.lastName}</h2>
                  <p className={css({ textStyle: "body", color: "purple" })}>@{recipient.username}</p>
                </div>
                <div className={vstack({ alignItems: "start" })}>
                  
                  {messages && <ul className={vstack({ alignItems: "start" })}>
                    {messages.map((message) => <li>
                      <Card>
                        {message}
                      </Card>
                    </li>)}
                  </ul>}
                  <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
                  <Button onClick={() => sendMessage()}>Envoyer</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}