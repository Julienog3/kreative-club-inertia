import { Head, router, usePage } from "@inertiajs/react";
import { SecurityForm } from "~/components/forms/security-form";
import { ConfirmContextProvider, useConfirm } from "~/components/layout/confirm-context";
import { Layout } from "~/components/layout/layout";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";

const confirmDeleteModalValues = { 
  title: 'Voulez vous supprimer votre compte ?', 
  description: 'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.'
}

export default function Security() {
  const { confirm } = useConfirm()
  const { user } = usePage().props

  async function deleteAccount() {
    if (!await confirm(confirmDeleteModalValues)) return
    await router.delete(`/users/${(user as User).id}`)
  }

  return <>
    <Head title="Sécurité" />
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
              <h2 className={css({ textStyle: "subtitle" })}>Sécurité</h2>
              <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
            </div>
          </header>
          <section className={vstack({ p: "1rem", alignItems: "start" })}>
            <SecurityForm />
            <div className={hstack({ justifyContent: "space-between", gap: "0", p: "1rem", border: "solid 2px black", borderRadius: "5px", w: "100%" })}>
              <div className={vstack({ alignItems: "start", gap: "0" })}>
                <h4 className={css({ textStyle: "h4" })}>Supprimer votre compte</h4>
                <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus. Vel facilisis volutpat.</p>
              </div>
              <Button onClick={deleteAccount} variant="danger">Supprimer</Button>
            </div>
          </section>
        </Card>
      </PreferencesLayout>
  </>
}

Security.layout = (page: React.ReactNode) => (
  <ConfirmContextProvider>
    <Layout children={page} />
  </ConfirmContextProvider>
)