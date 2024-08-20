import React from "react";
import { grid, gridItem, hstack, vstack } from "~/styled-system/patterns";
import List from "../ui/list";
import { Link } from "@inertiajs/react";
import { css } from "~/styled-system/css";
import { Breadcrumb } from "../ui/breadcrumb";
import ChevronRight from '~/assets/icons/chevron-right.svg?react'

import { ConfirmContextProvider } from "./confirm-context";

interface PreferencesLayoutProps {
  children: React.ReactNode;
}

export function PreferencesLayout({
  children,
}: PreferencesLayoutProps): JSX.Element {
  // const { user } = usePageContext();

  return (
    <div
      className={vstack({
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        alignItems: "start",
        py: "2rem"
      })}
    >
      <Breadcrumb />
      <div className={grid({ columns: 4, gap: "1rem", w: "100%" })}>
        <div
          className={vstack({
            width: "100%",
            position: "sticky",
            top: "1rem",
            gap: "1rem",
          })}
        >
          <List>
            <List.Header>Mes préférences</List.Header>
            <List.Item>
              <Link
                className={css({
                  p: "1rem",
                  w: "100%",
                  h: "100%",
                  display: "block",
                })}
                href="/preferences/profile"
              >
                <span className={hstack({ justifyContent: "space-between" })}>
                  Mon profil
                  <ChevronRight />
                </span>
              </Link>
            </List.Item>
            <List.Item>
              <Link
                className={css({
                  p: "1rem",
                  w: "100%",
                  h: "100%",
                  display: "block",
                })}
                href="/preferences/security"
              >
                <span className={hstack({ justifyContent: "space-between" })}>
                  Sécurité
                  <ChevronRight />
                </span>
              </Link>
            </List.Item>
            <List.Item>
              <Link
                className={css({
                  p: "1rem",
                  w: "100%",
                  h: "100%",
                  display: "block",
                })}
                href="/preferences/notifications"
              >
                <span className={hstack({ justifyContent: "space-between" })}>
                  Notifications
                  <ChevronRight />
                </span>
              </Link>
            </List.Item>
          </List>
          <List>
            <List.Header bgColor="purple">Mon espace créative</List.Header>
            <List.Item>
              <Link
                className={css({
                  p: "1rem",
                  w: "100%",
                  h: "100%",
                  display: "block",
                })}
                href="/preferences/creative-profile"
              >
                <span className={hstack({ justifyContent: "space-between" })}>
                  Mon profil créatif
                  <ChevronRight />
                </span>
              </Link>
            </List.Item>
            <List.Item>
              <Link
                className={css({
                  p: "1rem",
                  w: "100%",
                  h: "100%",
                  display: "block",
                })}
                href="/preferences/portfolio"
              >
                <span className={hstack({ justifyContent: "space-between" })}>
                  Mon portfolio
                  <ChevronRight />
                </span>
              </Link>
            </List.Item>
          </List>
        </div>
        <section className={gridItem({ colSpan: 3 })}>{children}</section>
      </div>
    </div>
  );
}
