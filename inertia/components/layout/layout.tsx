/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { AuthModal } from './../../components/modals/auth-modal/auth-modal'
import { Snackbar } from '../ui/snackbar/snackbar'
import { User } from '~/types'
import { css } from '~/styled-system/css'

interface Props extends PropsWithChildren {
  user?: User
}

export function Layout({ children, user }: Props ) {
  return (
    <>
      <AuthModal />
      <Snackbar />
      <Header user={user} />
      <main className={css({ backgroundColor: "background" })}>
        {children}
      </main>
      <Footer />
    </>
  )
}
