import { Head } from "@inertiajs/react";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import Card from "~/components/ui/card";

export default function Security() {
  return <>
    <Head title="Sécurité" />
    <PreferencesLayout>
      <Card>
        <h2>Sécurité</h2>
      </Card>
    </PreferencesLayout>
  </>
}