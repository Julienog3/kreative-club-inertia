import { Link, router } from '@inertiajs/react'
import { Button } from './../ui/button'
import Logo from './../../assets/logo.svg?react'
import { AuthModalType } from './../modals/auth-modal/auth-modal'
import { center, hstack, vstack } from '~/styled-system/patterns'
import { css } from '~/styled-system/css'
import { useStoreAuthModal } from '../modals/auth-modal/auth-modal.store'
import { User } from '~/types'
import { HeaderProfile } from './header-profile'
import DisconnectIcon from "~/assets/icons/arrow-right-start-on-rectangle.svg?react"
import HelpIcon from "~/assets/icons/lifebuoy.svg?react"
import SettingsIcon from "~/assets/icons/cog-6-tooth.svg?react"
import { Dropdown } from '../ui/dropdown'
import BookmarkOutline from '~/assets/icons/bookmark-outline.svg?react'
 
interface Props {
  user?: User
}

export function Header({ user }: Props) {
  const openModal = useStoreAuthModal((store) => store.openModal)

  function onLogout() {
    router.post('/auth/logout', {}, { onSuccess: () => router.reload({ only: ['user'] })})
  } 
  
  let dropdownItems = [
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
      label: "Se déconnecter",
      icon: <DisconnectIcon />,
      onClick: () => onLogout(),
    },
  ];

  return (
    <header
      className={vstack({
        width: '100%',
        height: '5rem',
        paddingX: '1rem',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottom: 'solid #000 2px',
      })}
    >
      <Link href="/">
        <Logo className={css({ width: '5rem' })} />
      </Link>
      <div className={hstack({ gap: "1rem" })}>
        <Link href="/creatives">
          <p className={css({ textStyle: "body" })}>Découvrir</p>
        </Link>
        <Link href="/messages">
          <p className={css({ textStyle: "body" })}>Messagerie</p>
        </Link>

        <Link href="/bookmarks">
          <button
            className={center({
              border: "2px solid black",
              rounded: "10px",
              padding: ".5rem",
              h: "3.25rem",
              w: "3.25rem",
              backgroundColor: "gray",
              cursor: "pointer",
            })}
          >
            <BookmarkOutline />
          </button>
        </Link>
        {user ? (
          <>
            <Dropdown items={dropdownItems}>
              <HeaderProfile user={user} />
            </Dropdown>
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
      </div>
    </header>
  )
}
