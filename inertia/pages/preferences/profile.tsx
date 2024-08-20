import { Head, usePage } from "@inertiajs/react";
import { ProfileForm } from "~/components/forms/profile-form";
import { Layout } from "~/components/layout/layout";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";

export default function Profile() {
  const { props: { user }} = usePage()

  return <>
    <Head title="Mon profil" />
    <PreferencesLayout>
      <Card css={{ width: "100%", height: "100%" }} withShadow>
        <header
          className={hstack({
            w: "100%",
            p: "1rem",
            justifyContent: "space-between",
            borderBottom: "solid 2px black"
          })}
        >
          <div className={vstack({ alignItems: "start", gap: "0" })}>
            <h2 className={css({ textStyle: "subtitle" })}>Mon profil</h2>
            <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
          </div>
        </header>
        <section className={css({ p: "1rem" })}>
          <ProfileForm id="profile-form" user={user as User}/>
        </section>
      </Card>
    </PreferencesLayout>
  </>
}

Profile.layout = (page: React.ReactNode) => <Layout children={page} />
