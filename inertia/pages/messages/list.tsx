import { Head, Link, router, usePage } from "@inertiajs/react";
import Chip from "~/components/ui/chip";
import { css } from "~/styled-system/css";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import HomeIcon from "~/assets/icons/home.svg?react"
import { useEffect, useState } from "react";
import { User } from "~/types";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { Transmit } from "@adonisjs/transmit-client";
import List from "~/components/ui/list";

interface Props {}

export default function Inbox(props: Props) {
  const [value, setValue] = useState<string>()
  const { props: { user } } = usePage()
  const { purchases } = props

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
                <h2 className={css({ textStyle: "title" })}>Messagerie</h2>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}