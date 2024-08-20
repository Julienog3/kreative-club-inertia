import { ChangeEvent, useEffect, useState } from "react";
import { vstack } from "~/styled-system/patterns";
import { css, cva, sva } from "~/styled-system/css";
import { FileUpload as ArkFileUpload } from "@ark-ui/react";



interface Props {
  name: string;
  label: string;
  value?: string
  maxFiles?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

// const dropzone = cva({
//   base: {
//     textStyle: "body",
//     w: "0.1px",
//     h: "0.1px",
//     opacity: 0,
//     overflow: "hidden",
//     position: "absolute",
//     zIndex: -1,
//   },
// });

const dropzoneRecipe = sva({
  slots: ['root', 'label', 'dropzone', 'item'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      textStyle: 'body',
      gap: ".5rem",
      width: "100%"
    },
    label: {},
    dropzone: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      minH: "8rem",
      borderRadius: "10px",
      border: "2px dashed black",
      p: "1rem",
      width: "100%",
      cursor: "pointer",
      transition: "background",
      _hover: {
        bgColor: "gray",
      },
    },
    item: {
      w: "5rem",
      h: "5rem",
      border: "2px solid black",
      borderRadius: "5px",
    }
  }
})

export const Dropzone = (props: Props) => {
  const { label, onChange, required, maxFiles, name } = props

  const classes = dropzoneRecipe()

  return (
    <ArkFileUpload.Root name={name} onChange={onChange} required={required} className={classes.root} maxFiles={maxFiles}>
      <ArkFileUpload.Label className={classes.label}>{label}</ArkFileUpload.Label>
      <ArkFileUpload.Dropzone className={classes.dropzone}>Faites glisser et déposez vos fichiers ici ou</ArkFileUpload.Dropzone>
       <ArkFileUpload.ItemGroup>
        <ArkFileUpload.Context>
          {({ acceptedFiles }) =>
            acceptedFiles.map((file) => (
              <ArkFileUpload.Item className={classes.item} key={file.name} file={file}>
                <ArkFileUpload.ItemPreview type="image/*">
                  <ArkFileUpload.ItemPreviewImage />
                </ArkFileUpload.ItemPreview>
                <ArkFileUpload.ItemPreview type=".*">
                </ArkFileUpload.ItemPreview>
                <ArkFileUpload.ItemName />
                <ArkFileUpload.ItemSizeText />
                <ArkFileUpload.ItemDeleteTrigger>supprimer</ArkFileUpload.ItemDeleteTrigger>
              </ArkFileUpload.Item>
            ))
          }
        </ArkFileUpload.Context>
      </ArkFileUpload.ItemGroup>
      <ArkFileUpload.HiddenInput />
    </ArkFileUpload.Root>
  );
};
