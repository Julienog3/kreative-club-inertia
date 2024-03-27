/// <reference types="vite-plugin-svgr/client" />

import { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer'

export function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
