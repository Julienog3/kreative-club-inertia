import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { Layout } from '../components/layout/layout'
import { User } from '~/types'

const appName = import.meta.env.VITE_APP_NAME || 'Kreative Club'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    console.log(props.initialPage)
    const user = props.initialPage.props.user as User

    hydrateRoot(
      el,
      <Layout user={user}>
        <App {...props} />
      </Layout>
    )
  },
})
