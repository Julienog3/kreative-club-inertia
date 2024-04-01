import logger from '@adonisjs/core/services/logger'
import { defineConfig } from '@adonisjs/inertia'

export default defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    errors: (ctx) => ctx.session?.flashMessages.get('errors'),
    user: ({ auth }) => {
      return auth.user
      // const user = auth.authenticateUsing(["web"])
      // logger.info(user)

      // if (!user) {
      //   return null
      // }

      // return user 
    },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: 'inertia/app/ssr.tsx'
  }
})