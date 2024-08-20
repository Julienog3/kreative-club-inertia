import { Head, router, usePage } from "@inertiajs/react";
import React from "react";
import { CreativeProfileForm } from "~/components/forms/creative-profile-form";
import { Layout } from "~/components/layout/layout";
import { PreferencesLayout } from "~/components/layout/preferences-layout";
import { Button } from "~/components/ui/button";
import Card from "~/components/ui/card";
import { useSnackbarStore } from "~/components/ui/snackbar/snackbar.store";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import { User } from "~/types";
import { Category } from "~/types/category";

interface Props {
  creative: User
  categories: Category[]
}

export default function CreativeProfile(props: Props) {
  const { categories, creative } = props

  const { addItem } = useSnackbarStore(store => store)  

  async function toggleCreativeProfile() {
    await router.put(`/users/${creative.id}`, 
      {
        portfolioEnabled: !creative.portfolioEnabled
      },
      {
        onSuccess: () => {
          addItem({ type: "success", message: `Votre profil a été ${creative.portfolioEnabled ? 'désactivé' : 'activé'}`})
          router.reload({ only: ['creative'] })
        }
      }
    )
  }

  return <>
    <Head title="Mon profil créatif" />
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
            <h2 className={css({ textStyle: "subtitle" })}>Mon profil créatif</h2>
            <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus.</p>
          </div>
        </header>
        <section className={vstack({ p: "1rem", alignItems: "start" })}>
          <div className={vstack({ 
            justifyContent: "space-between", 
            alignItems: "start", 
            gap: "0", 
            p: "1rem", 
            border: "solid 2px black", 
            borderRadius: "5px", 
            w: "100%", 
            h: "10rem", 
            bg: `${creative.portfolioEnabled ? "green": "red"}`}
          )}>
          <div className={vstack({ alignItems: "start", gap: "0" })}>
            <h4 className={css({ textStyle: "h4" })}>
              Votre profil créatif est {creative.portfolioEnabled ? "activé" : "désactivé"}
            </h4>
            <p className={css({ textStyle: "body" })}>Tempus iaculis urna id volutpat lacus. Vel facilisis volutpat.</p>
          </div>
            <Button 
              onClick={toggleCreativeProfile} 
              variant={creative.portfolioEnabled ? "danger" : "success"}
            >
              Passer mon profil en {creative.portfolioEnabled ? "privé" : "publique"}
            </Button>
          </div>
          <CreativeProfileForm categories={categories} creative={creative} />
        </section>
      </Card>
    </PreferencesLayout>
  </>
}

CreativeProfile.layout = (page: React.ReactNode) => <Layout children={page} />