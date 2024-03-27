import { Link } from '@inertiajs/react'
import { hstack, vstack } from '../../../styled-system/patterns'
import { css } from '../../../styled-system/css'
import { Button } from './../ui/button'
import Logo from './../../assets/logo.svg?react'

export function Header() {
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
      <div className={hstack({ gap: '1rem' })}>
        <Link href="/creatives">
          <p className={css({ textStyle: 'body' })}>Découvrir</p>
        </Link>
        <Link href="/messages">
          <p className={css({ textStyle: 'body' })}>Messagerie</p>
        </Link>
      </div>
      <Button>Salut</Button>
    </header>
  )
}
