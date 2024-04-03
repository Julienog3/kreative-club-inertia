import { Head, useForm } from '@inertiajs/react'
import Chip from '~/components/ui/chip';
import { grid, gridItem, hstack, vstack } from '~/styled-system/patterns';
import HomeIcon from '~/assets/icons/home.svg?react'
import { css } from '~/styled-system/css';
import { User } from '~/types';
import { CreativeCard } from '~/components/creatives/creative-card';
import { z } from 'zod';

interface Props {
  creatives: User[]
}

const filterCreativesSchema = z.object({
  categories: z.number().array().optional(),
});

type filterCreativesInputs = z.infer<typeof filterCreativesSchema>

export default function List(props: Props) {
  const { creatives } = props

  const { data, setData } = useForm<filterCreativesInputs>({ categories: [] })

  function submit() {
    
  }

  return (
    <div
      className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}
    >
      <div className={hstack({ mb: "2.5rem" })}>
        <Chip>
          <HomeIcon /> Accueil
        </Chip>
        <Chip>Tous les créatifs</Chip>
      </div>
      <h2 className={css({ textStyle: "title", mb: "1.5rem" })}>
        Tous les créatifs
      </h2>
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
      <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
        {creatives &&
          creatives.map((creative) => (
            <li key={creative.id}>
              <CreativeCard {...creative} />
            </li>
          ))}
      </ul>
    </div>
  );
}
