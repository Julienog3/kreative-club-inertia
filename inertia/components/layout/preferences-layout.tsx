import React from "react";
import { grid, gridItem, vstack } from "~/styled-system/patterns";
import List from "../ui/list";
import { Link } from "@inertiajs/react";
import { css } from "~/styled-system/css";

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
                Mon profil
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
                Sécurité
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
                Notifications
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
                Mon profil créatif
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
                Mon portfolio
              </Link>
            </List.Item>
          </List>
        </div>
        <div className={gridItem({ colSpan: 3 })}>{children}</div>
      </div>
    </div>
  );
}
