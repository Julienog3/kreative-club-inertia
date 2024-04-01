import { Head } from "@inertiajs/react";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";

export default function Portfolio() {
  return (
    <>
      <Head title="Notifications" />
      <PreferencesLayout>
        <Card>
          <div
            className={vstack({
              w: "100%",
              alignItems: "flex-start",
              p: "1rem",
              height: "100%",
            })}
          >
            <h2 className={css({ textStyle: "title" })}>Portfolio</h2>
          </div>
        </Card>
      </PreferencesLayout>
    </>
  )
}