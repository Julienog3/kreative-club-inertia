import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { Layout } from '~/components/layout/layout'
import { transmit } from './app'


export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      let page = pages[`../pages/${name}.tsx`]
      page.default.layout = page.default.layout || (page => <Layout children={page} />)
      return page
    },
    setup: ({ App, props }) => {
      return (<App {...props} />)
    },
  })
}
