import { Head, router } from "@inertiajs/react";
import { ProfileForm } from "~/components/forms/profile-form";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import { ProfileCard } from "~/components/profile-card";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { User } from "~/types";

interface Props {
  user: User;
}

export default function Profile({ user }: Props) {
  return <>
    <Head title="Mon profil" />
    <PreferencesLayout>
      <Card css={{ width: "100%", height: "100%", p: ".5rem" }}>
        <div
          className={vstack({
            w: "100%",
            alignItems: "flex-start",
            p: "1rem",
            height: "100%",
          })}
        >
          <h2 className={css({ textStyle: "title" })}>Profil</h2>
          <ProfileCard user={user} />
          <ProfileForm user={user}/>
        </div>
      </Card>
    </PreferencesLayout>
  </>
}