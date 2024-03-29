/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { AuthModal } from './../../components/modals/auth-modal/auth-modal'
import { Snackbar } from '../ui/snackbar/snackbar'
import { User } from '~/types'

interface Props {
  user?: User
}

export function Layout({ children, user }: Props & PropsWithChildren) {
  return (
    <>
      <AuthModal />
      <Snackbar />
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
