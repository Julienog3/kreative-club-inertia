import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { Layout } from '../components/layout/layout'

const appName = import.meta.env.VITE_APP_NAME || 'Kreative Club'

createInertiaApp({
  progress: { color: '#5468FF' },
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    let page = pages[`../pages/${name}.tsx`]
    page.default.layout = page.default.layout || (page => <Layout children={page} />)
    // return resolvePageComponent(`../pages/${name}.tsx`, )
    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(
      el,
      <App {...props} />
    )
  },
})
