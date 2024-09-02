/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { AuthModal } from './../../components/modals/auth-modal/auth-modal'
import { Snackbar } from '../ui/snackbar/snackbar'
import { css } from '~/styled-system/css'
import { Head, usePage } from '@inertiajs/react'
import { User } from '~/types'

export function Layout({ children }: PropsWithChildren) {
  const { props: { user }} = usePage()

  return (
    <>
      <AuthModal />
      <Snackbar />
      <Header user={user as User} />
      <main className={css({ backgroundColor: "background" })}>
        {children}
      </main>
      <Footer />
    </>
  )
}
