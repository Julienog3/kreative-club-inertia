import { Link, router } from '@inertiajs/react'
import { Button } from './../ui/button'
import Logo from './../../assets/logo.svg?react'
import { AuthModalType } from './../modals/auth-modal/auth-modal'
import { hstack, vstack } from '~/styled-system/patterns'
import { css } from '~/styled-system/css'
import { useStoreAuthModal } from '../modals/auth-modal/auth-modal.store'
import { User } from '~/types'
import { HeaderProfile } from './header-profile'
import DisconnectIcon from "~/assets/icons/arrow-right-start-on-rectangle.svg?react"
import HelpIcon from "~/assets/icons/lifebuoy.svg?react"
import SettingsIcon from "~/assets/icons/cog-6-tooth.svg?react"
import Inbox from '~/assets/icons/inbox.svg?react'
import Group from '~/assets/icons/group.svg?react'
import BookmarkOutline from '~/assets/icons/bookmark-outline.svg?react'
import { Menu } from '../ui/menu'
import Chip from '../ui/chip'
import RectangleGroup from '~/assets/icons/rectangle-group.svg?react'
import { useEffect, useState } from 'react'
import ListBulletIcon from '~/assets/icons/list-bullet.svg?react'

interface Props {
  user?: User
}

function onLogout() {
  router.post('/auth/logout', {}, { onSuccess: () => router.reload({ only: ['user'] })})
} 

let defaultdropdownItems = [
  {
    label: "Paramètres",
    icon: <SettingsIcon />,
    link: "/preferences/profile",
  },
  {
    label: "Support",
    icon: <HelpIcon />,
    link: "/profile",
  },
  {
    label: "Historique",
    icon: <ListBulletIcon />,
    link: "/history",
  },
  {
    label: "Se déconnecter",
    icon: <DisconnectIcon />,
    onClick: () => onLogout(),
  },
];

export function Header({ user }: Props) {
  const openModal = useStoreAuthModal((store) => store.openModal)
  const [dropdownItems, setDropdownItems] = useState<any[]>(defaultdropdownItems)

  useEffect(() => {
    if (user?.portfolioEnabled) {
      setDropdownItems([...dropdownItems, {
        label: "Dashboard",
        icon: <RectangleGroup />,
        link: "/dashboard",
      }])
    }
  }, [])

  return (
    <header
      className={vstack({
        position: "sticky",
        top: 0,
        width: '100%',
        height: '5rem',
        paddingX: '1rem',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottom: 'solid #000 2px',
        zIndex: 10
      })}
    >
      <Link href="/">
        <Logo className={css({ width: '5rem' })} />
      </Link>
      <nav className={hstack({ gap: "2rem" })}>
        <ul className={hstack({ gap: ".5rem" })}>
          <li 
            className={css({
              rounded: "10px",
              padding: ".5rem",
              cursor: "pointer",
              transition: "all .5s",
              _hover: {
                backgroundColor: "background",
              }
            })}
          >
            <Link href="/creatives" className={hstack({ gap: ".5rem" })}>
              <Group />
              <p className={css({ textStyle: "body"})}>Découvrir</p>
            </Link>
          </li>
          {user && <>
            <li 
              className={css({
                rounded: "10px",
                padding: ".5rem",
                cursor: "pointer",
                transition: "all .5s",
                _hover: {
                  backgroundColor: "background",
                }
              })}
            >
              <Link href="/inbox" className={hstack({ gap: ".5rem" })}>
                <Inbox className={css({ w: "2rem" })} />
                <p className={css({ textStyle: "body"})}>Messagerie</p>
              </Link>
            </li>
            <li 
              className={css({
                rounded: "10px",
                padding: ".5rem",
                cursor: "pointer",
                transition: "all .5s",
                stroke: "background",
                _hover: {
                  backgroundColor: "background",
                }
              })}
            >
              <Link href="/bookmarks" className={hstack({ gap: ".5rem" })}>
                <BookmarkOutline className={css({ w: "2rem" })} />
                <p className={css({ textStyle: "body"})}>Mes signets</p>
              </Link>
            </li>
          </>}
        </ul>
        {user ? (
          <>
            {user.role === 'admin' && 
              <Link href="/admin/general">
                <Chip variant='success'>Admin</Chip>
              </Link>
            }
            <Menu items={dropdownItems}>
              <HeaderProfile user={user} />
            </Menu>
          </>
        ) : (
          <>
            <span
              role="button"
              className={css({ textStyle: "body", cursor: "pointer" })}
              onClick={(): void => openModal(AuthModalType.LOGIN)}
            >
              Se connecter
            </span>
            <Button onClick={(): void => openModal(AuthModalType.SIGNUP)}>
              Rejoindre le club
            </Button>
          </>
        )}
      </nav>
    </header>
  )
}
