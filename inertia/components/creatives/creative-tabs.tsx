import React from "react";
import { Tabs } from '@ark-ui/react'
import { Link, usePage } from '@inertiajs/react'
import { hstack } from "~/styled-system/patterns";
import { css, cva } from "~/styled-system/css";

type Tab = {
  label: string
  to: string
}

interface Props {
  tabs: Tab[]
}

const tabStyle = cva({
  base: {
    border: 'black 2px solid', 
    borderBottom: 'black 2px solid',
    backgroundColor: 'gray',  
    textStyle: 'body', 
    paddingX: '1rem', paddingY: '.5rem', 
    borderTopRadius: "10px", 
    cursor: 'pointer',
  },
  variants: {
    active: {
      true: {
        backgroundColor: 'white',  
        borderBottom: 'white 2px solid',
      }
    }
  }
})

export function CreativeTabs(props: Props) {
  const { tabs } = props

  const { url, component } = usePage()
  console.log({ url, component })

  const activeTab = (element: string) => url.endsWith('/' + element)
  
  return (
     <Tabs.Root className={css({ position: "relative", bottom: "-2px" })}>
      <Tabs.List>
        {tabs && <ul className={hstack()}>
          {tabs.map((tab) => (
            <>
              <Tabs.Trigger 
                asChild 
                value={tab.to}
                className={tabStyle({ active: activeTab(tab.to) })} 
              >
                <Link 
                  className={css({ w: "100%", h: "100%" })} 
                  href={tab.to} 
                  only={['creative']} 
                  preserveScroll
                >
                  {tab.label}
                </Link>
              </Tabs.Trigger>
            </>
          ))}
        </ul>}
      </Tabs.List>
     </Tabs.Root>
  )
}