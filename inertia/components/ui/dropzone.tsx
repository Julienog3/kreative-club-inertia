import { ChangeEvent, useState } from "react";
import { vstack } from "~/styled-system/patterns";
import { css, cva } from "~/styled-system/css";

interface DropzoneProps {
  label: string;
  value?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  required: boolean
}

const dropzone = cva({
  base: {
    textStyle: "body",
    w: "0.1px",
    h: "0.1px",
    opacity: 0,
    overflow: "hidden",
    position: "absolute",
    zIndex: -1,
  },
});

export const Dropzone = ({ label, value, onChange, required }: DropzoneProps) => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const selectedImageUrl: string | null = selectedImage
    ? URL.createObjectURL(selectedImage)
    : null;

  const previewImage = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className={vstack({ gap: ".5rem", alignItems: "start" })}>
      <p className={css({ textStyle: "body" })}>
        {label}
        {required && (
          <span className={css({ color: "purple", ml: ".25rem" })}>*</span>
        )}
      </p>
      <label
        htmlFor="dropzone"
        className={vstack({
          alignItems: "center",
          justifyContent: "center",
          minH: "8rem",
          borderRadius: "10px",
          border: "2px dashed black",
          p: "1rem",
          w: "100%",
          cursor: "pointer",
          transition: "background",
          _hover: {
            bgColor: "gray",
          },
        })}
      >
        {selectedImageUrl && (
          <img
            className={css({
              w: "6rem",
              borderRadius: "10px",
              border: "2px solid black",
            })}
            src={selectedImageUrl}
          />
        )}
        <p className={css({ textStyle: "body" })}>
          Faites glisser et déposez vos fichiers ici ou{" "}
          <span className={css({ color: "purple" })}>naviguez</span>
        </p>
        <input
          id="dropzone"
          type="file"
          className={dropzone()}
          value={value}
          onChange={onChange}
          // {...register(label, { ...options, onChange: (e) => prev iewImage(e) })}
        />
      </label>
    </div>
  );
};
