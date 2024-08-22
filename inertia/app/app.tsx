/// <reference path="../../adonisrc.ts" />

import '../css/app.css'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createInertiaApp, router } from '@inertiajs/react'
import { Layout } from '../components/layout/layout'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'Kreative Club'

createInertiaApp({
  progress: { color: '#5468FF' },
  title: (title) => `${title} - ${appName}`,
  // resolve: (name) => {
  //   const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
  //   let page = pages[`../pages/${name}.tsx`]
  //   page.default.layout = page.default.layout || (page => <Layout children={page} />)
  //   return resolvePageComponent(`../pages/${name}.tsx`)
  // },
  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.tsx`,
      import.meta.glob('../pages/**/*.tsx'),
    )
  },
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(<App {...props} />);
  },
  // setup({ el, App, props }) {
  //   hydrateRoot(
  //     el,
  //     <App {...props} />
  //   )
  // },
})
