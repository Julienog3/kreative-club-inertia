import { Head } from '@inertiajs/react'
import { css } from '~/styled-system/css'
import { hstack, vstack } from '~/styled-system/patterns'

// import { vstack, hstack } from './../../styled-system/patterns'
export default function Home(props: { version: number }) {
  return (
    <>
      <Head title="Homepage" />
      <div
        className={vstack({
          width: '100%',
          bg: 'cyan',
          position: 'relative',
        })}
      >
        <div
          className={hstack({
            minHeight: '100vh',
            width: '100%',
            maxWidth: 'breakpoint-xl',
            margin: '0 auto',
          })}
        >
          <div
            className={vstack({
              minHeight: '100vh',
              alignItems: 'start',
              justifyContent: 'center',
            })}
          >
            <h1 className={css({ textStyle: 'title' })}>
              Créez votre vision, choisissez votre talent
            </h1>
            <p
              className={css({
                textStyle: 'body',
              })}
            >
              Mauris scelerisque, lectus nec egestas cursus, est erat tempor lorem, ac tristique
              ipsum odio et felis. Suspendisse ac vulputate ligula. Nulla id arcu accumsan,
              vulputate nisl sed, consequat odio.
            </p>

            {/* <Button onClick={() => openModal(AuthModalType.SIGNUP)}>
              <p className={css({ textStyle: 'body', fontSize: '1.25rem' })}>Rejoindre le club</p>
            </Button> */}
          </div>
          {/* <img
            className={css({
              // position: "absolute",
              width: '40%',
              // height: "0%",
            })}
            src="/images/mascot.png"
            alt=""
          /> */}
        </div>
      </div>
    </>
  )
}
