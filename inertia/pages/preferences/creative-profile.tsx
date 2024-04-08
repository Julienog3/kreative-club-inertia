import { Head } from "@inertiajs/react";
import { CreativeProfileForm } from "~/components/forms/creative-profile-form";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { vstack } from "~/styled-system/patterns";
import { Category } from "~/types/category";

interface Props {
  categories: Category[]
}

export default function CreativeProfile(props: Props) {
  const { categories } = props

  return <>
    <Head title="Mon profil créatif" />
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
          <h2 className={css({ textStyle: "title" })}>Profil créatif</h2>
          <CreativeProfileForm categories={categories}/>
        </div>
      </Card>
    </PreferencesLayout>
  </>
}