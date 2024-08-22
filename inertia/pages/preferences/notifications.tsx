import { Head } from "@inertiajs/react";
import { Layout } from "~/components/layout/layout";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";

export default function Notifications() {
  return <>
    <Head title="Notifications" />
    <PreferencesLayout>
      <Card withShadow>
         <header
          className={hstack({
            w: "100%",
            p: "1rem",
            justifyContent: "space-between",
            borderBottom: "solid 2px black"
          })}
        >
          <div className={vstack({ alignItems: "start", gap: "0" })}>
            <h2 className={css({ textStyle: "subtitle" })}>Notifications</h2>
            <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
          </div>
        </header>
      </Card>
    </PreferencesLayout>
  </>
}

Notifications.layout = (page: React.ReactNode) => <Layout children={page} />