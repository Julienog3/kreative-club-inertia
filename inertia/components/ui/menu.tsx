import { Menu as ArkMenu } from '@ark-ui/react'
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react'
import { sva } from '~/styled-system/css'
import { hstack } from '~/styled-system/patterns';

const menuStyle = sva({
  slots: ['content', 'item'],
  base: {
    content: {
      zIndex: "10",
      backgroundColor: "white",
      width: "15rem",
      alignItems: "left",
      overflow: "hidden",
      marginTop: "1rem",
      gap: "0",
      rounded: "10px",
      border: "solid black 2px",
    },
    item: {
      textStyle: "body",
      _hover: { bgColor: "gray" },

    }
  }
})

type DropdownItem = {
  label: string;
  icon: JSX.Element;
  link?: string;
  onClick?: () => void;
};

interface Props extends PropsWithChildren {
  items: DropdownItem[];
}

export const Menu = (props: Props) => {
  const { children, items } = props
  const styles = menuStyle()

  return (
    <ArkMenu.Root>
      <ArkMenu.Trigger>{children}</ArkMenu.Trigger>
      <ArkMenu.Positioner>
        <ArkMenu.Content className={styles.content}>
          {items.map(({ label, link, icon, onClick }) => (
            <ArkMenu.Item key={label} className={styles.item} id={label} value="">
              {link ? (
                <Link
                  className={hstack({
                    padding: ".75rem",
                  })}
                  href={link ?? ""}
                >
                  {icon} {label}
                </Link>
              ) : (
                <div
                  onClick={onClick}
                  className={hstack({
                    padding: ".75rem",
                  })}
                >
                  {icon} {label}
                </div>
              )}
            </ArkMenu.Item>
          ))}
        </ArkMenu.Content>
      </ArkMenu.Positioner>
    </ArkMenu.Root>
  )
}
