import { Head } from "@inertiajs/react";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import Card from "~/components/ui/card";

export default function CreativeProfile() {
  return <>
    <Head title="Mon profil créatif" />
    <PreferencesLayout>
      <Card>
        <h2>Mon profil créatif</h2>
      </Card>
    </PreferencesLayout>
  </>
}