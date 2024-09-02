import { Head, router, useForm, usePage } from '@inertiajs/react'
import { grid, gridItem, vstack } from '~/styled-system/patterns';
import { css } from '~/styled-system/css';
import { User } from '~/types';
import { CreativeCard } from '~/components/creatives/creative-card';
import { z } from 'zod';
import Input from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import React, { FormEventHandler } from 'react';
import { PageHeader } from '~/components/layout/page-header';
import { Breadcrumb } from '~/components/ui/breadcrumb';
import { Layout } from '~/components/layout/layout';
import { CreativesFilterForm } from '~/components/creatives/creatives-filter-form';
import { Category } from '~/types/category';

interface Props {
  creatives: User[]
  categories: Category[]
}


export default function List(props: Props) {
  const { creatives, categories } = props

  return (
    <>
      <Head title="Tous les créatifs" />
      <PageHeader color="yellow">
        <Breadcrumb />
        <div className={vstack({ alignItems: 'start', mb: "1.25rem", gap: ".25rem" })}>
          <h2 className={css({ textStyle: "title" })}>
            Tous les créatifs
          </h2>
          <p className={css({ textStyle: "body" })}>Trouvez le créatif qui vous correspond.</p>
        </div>
        <CreativesFilterForm categories={categories} />
      </PageHeader>
      <div className={vstack({
        alignItems: "start",
        minHeight: "100vh",
        width: "100%",
        maxWidth: "breakpoint-xl",
        margin: "0 auto",
        p: "1rem",
      })}>
        {creatives.length >= 1 
          ? <ul className={grid({ columns: 3, h: "100%", gap: "1.5rem" })}>
            {creatives &&
              creatives.map((creative) => (
                <li key={creative.id}>
                  <CreativeCard {...creative} />
                </li>
              ))}
          </ul>
          : <span className={css({ textStyle: "body" })}>Aucun créatif n'a été trouvé.</span>
        }
      </div>
    </>
  );
}

List.layout = (page: React.ReactNode) => <Layout children={page} />