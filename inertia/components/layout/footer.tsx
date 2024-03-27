import { css } from '../../../styled-system/css'
import { hstack, vstack } from '../../../styled-system/patterns'
import Logo from './../../assets/logo.svg?react'

export function Footer() {
  return (
    <footer
      className={hstack({
        w: '100%',
        bgColor: 'white',
        h: '25vh',
        borderTop: '2px solid black',
        p: '2rem',
        // justifyContent: "space-between",
      })}
    >
      <div
        className={vstack({
          h: '100%',
          alignItems: 'start',
          justifyContent: 'center',
          gap: '1rem',
        })}
      >
        <Logo className={css({ width: '7.5rem' })} />
        <p className={css({ textStyle: 'body', w: '75%', fontSize: '.9rem' })}>
          La plateforme de service de graphisme pour les freelances débutants
        </p>
      </div>
      {/* <div
        className={vstack({
          h: "100%",
          alignItems: "start",
          gap: "1rem",
        })}
      >
        <h3 className={css({ textStyle: "title" })}>Social</h3>
        <ul
          className={vstack({
            textStyle: "body",
            fontSize: ".9rem",
            alignItems: "start",
          })}
        >
          <li>
            <Link to="/">Instagram</Link>
          </li>
          <li>
            <Link to="/">Youtube</Link>
          </li>
          <li>
            <Link to="/">Linkedin</Link>
          </li>
        </ul>
      </div> */}
      <div
        className={vstack({
          h: '100%',
          alignItems: 'end',
          justifyContent: 'end',
          gap: 0,
          marginLeft: 'auto',
        })}
      >
        <p className={css({ textStyle: 'body', fontSize: '.9rem' })}>
          Copyright 2023 © Kreative club
        </p>
        <p className={css({ textStyle: 'body', fontSize: '.9rem' })}>Made with ❤ by Julien A.</p>
      </div>
    </footer>
  )
}
