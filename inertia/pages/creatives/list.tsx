import { Head, Link, router, useForm } from '@inertiajs/react'
import Chip from '~/components/ui/chip';
import { grid, gridItem, hstack, vstack } from '~/styled-system/patterns';
import HomeIcon from '~/assets/icons/home.svg?react'
import { css } from '~/styled-system/css';
import { User } from '~/types';
import { CreativeCard } from '~/components/creatives/creative-card';
import { z } from 'zod';
import Input from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { FormEventHandler } from 'react';

interface Props {
  creatives: User[]
}

const filterCreativesSchema = z.object({
  username: z.string(),
  categories: z.number().array().optional(),
});

type filterCreativesInputs = z.infer<typeof filterCreativesSchema>

export default function List(props: Props) {
  const { creatives } = props

  console.log({ creatives })

  const { data, setData } = useForm<filterCreativesInputs>()

  const submit: FormEventHandler<HTMLFormElement> = (e) => {
    const { username } = data
    const url = new URL('http://localhost:3333/creatives')

    if (username) {
      url.searchParams.append('username', username)
    }

    e.preventDefault()
    router.visit(url.href, { only: ['creatives'],})
  }

  return (
    <>
      <div className={vstack({ bgColor: "yellow", w: "100%", p: "2rem", alignItems: "start", borderBottom: "2px solid black" })}>
        <div 
          className={vstack({
            alignItems: "start",
            width: "100%",
            maxWidth: "breakpoint-xl",
            margin: "0 auto",
            p: "1rem",
          })}
          >
          <div className={hstack({ mb: "2.5rem" })}>
            <Link href='/'>
              <Chip>
                <HomeIcon /> Retourner à l'accueil
              </Chip>
            </Link>
          </div>
          <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
            Tous les créatifs
          </h2>
          <form onSubmit={submit}>
            <Input 
              label='Rechercher un créatif'
              value={data.username}
              onChange={(e) => setData('username',e.target.value)}  
            />
            <Button type='submit'>Rechercher</Button>
          </form>
        </div>
      </div>
      <div className={vstack()}>
          <form
            onSubmit={submit}
            className={grid({ gap: "1rem", columns: 2, w: "100%" })}
          >
            <div className={gridItem({ colSpan: 2 })}>
              {/* <Controller
                control={control}
                name="categories"
                render={({ field }) => <Autocomplete {...field} />}
              /> */}
            </div>
          </form>
      </div>
      <div className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}>
        <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
          {creatives &&
            creatives.map((creative) => (
              <li key={creative.id}>
                <CreativeCard {...creative} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
