import { Link, router } from '@inertiajs/react'
import { Button } from './../ui/button'
import Logo from './../../assets/logo.svg?react'
import { AuthModalType } from './../modals/auth-modal/auth-modal'
import { vstack } from '~/styled-system/patterns'
import { css } from '~/styled-system/css'
import { useStoreAuthModal } from '../modals/auth-modal/auth-modal.store'
import { User } from '~/types'
import { HeaderProfile } from './header-profile'
import DisconnectIcon from "~/assets/icons/arrow-right-start-on-rectangle.svg?react"
import HelpIcon from "~/assets/icons/lifebuoy.svg?react"
import SettingsIcon from "~/assets/icons/cog-6-tooth.svg?react"
import { Dropdown } from '../ui/dropdown'


interface Props {
  user?: User
}

export function Header({ user }: Props) {
  const openModal = useStoreAuthModal((store) => store.openModal)

  
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
      onClick: () => router.post('/auth/logout'),
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
    </header>
  )
}
