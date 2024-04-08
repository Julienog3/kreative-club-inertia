// import { useCategories } from "#root/src/api/categories/getCategories";
// import { css } from "#root/styled-system/css";
// import { hstack, vstack } from "#root/styled-system/patterns";
// import { ChangeEvent, forwardRef, useEffect, useState } from "react";
// import { Category } from "#root/types/category";
// import Chip from "../Chip/Chip";
// import { ControllerRenderProps, FieldValues } from "react-hook-form";
// import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
// import { IoIosArrowUp } from "@react-icons/all-files/io/IoIosArrowUp";

import { forwardRef, useEffect, useState } from "react";
import { css } from "~/styled-system/css";
import { hstack, vstack } from "~/styled-system/patterns";
import Chip from "./chip";

interface Props {
  value: string[]
  onChange: () => void
}

export const Autocomplete = forwardRef<
  HTMLInputElement,
  Props
>(({ value, onChange }, ref) => {
  // const { data: categories } = useCategories();
  const [suggestionValue, setSuggestionValue] = useState<string>("");

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Category[]>([]);

  useEffect(() => {
    if (value && categories) {
      setSelectedValues(formattedSelectedValue);
    }
  }, [categories]);

  const filteredCategories = categories?.filter((category) => {
    if (selectedValues.includes(category)) {
      return false;
    }
    return category.title
      .trim()
      .toLowerCase()
      .includes(suggestionValue.trim().toLowerCase());
  });

  const removeSelectedValue = (valueId: number) => {
    const newSelectedValues = selectedValues.filter(({ id }) => valueId !== id);
    onChange(newSelectedValues.map(({ id }) => id));
    setSelectedValues(newSelectedValues);
  };

  const formattedSelectedValue: Category[] = value.map(
    (categoryValue: number) =>
      categories?.find((category) => category.id === categoryValue),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsExpanded(true);
    setSuggestionValue(e.target.value);
  };

  return (
    <>
      <div
        onClick={(): void => setIsExpanded((value) => !value)}
        className={hstack({
          alignItems: "center",
          mb: ".5rem",
          p: ".5rem",
          border: "solid 2px black",
          rounded: "10px",
          w: "fit-content",
          cursor: "pointer",
          bgColor: "white",
        })}
      >
        <input
          type="text"
          role="combobox"
          id="categories"
          placeholder="Entrez une catégorie"
          autoComplete="off"
          ref={ref}
          className={css({
            textStyle: "body",
            _focus: {
              outline: "none",
            },
          })}
          aria-expanded="false"
          tabIndex={0}
          value={suggestionValue}
          onChange={(e) => handleChange(e)}
        />
        {isExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
        {/* <Button onClick={(): void => setIsExpanded((value) => !value)}>
          {isExpanded ? "toggled" : "not toggled"}
        </Button> */}
      </div>

      {isExpanded &&
        categories &&
        filteredCategories &&
        filteredCategories?.length > 0 && (
          <ul
            className={vstack({
              pos: "absolute",
              border: "solid 2px black",
              rounded: "10px",
              gap: "0",
              overflow: "hidden",
              bgColor: "white",
              zIndex: "999",
            })}
          >
            {filteredCategories.map((category, index) => (
              <li
                key={category.id}
                className={hstack({
                  textStyle: "body",
                  p: ".5rem",
                  justifyContent: "space-between",
                  borderBottom:
                    index === filteredCategories.length - 1
                      ? ""
                      : "solid 2px black",
                  width: "100%",
                  cursor: "pointer",
                  _hover: {
                    backgroundColor: "gray",
                  },
                })}
                onClick={(): void => {
                  setSelectedValues((selectedValues) => [
                    ...selectedValues,
                    category,
                  ]);
                  onChange([...value, category.id]);
                  setIsExpanded(false);
                }}
              >
                {category.title}
              </li>
            ))}
          </ul>
        )}
      {selectedValues && (
        <ul
          id="categorytypes"
          role="listbox"
          aria-label="Categories"
          className={hstack({
            alignItems: "start",
            mb: "1rem",
          })}
        >
          {selectedValues.map((selectedValue) => (
            <li role="option" key={selectedValue.id}>
              <Chip>
                {selectedValue.title}{" "}
                <button
                  onClick={(): void => removeSelectedValue(selectedValue.id)}
                >
                  x
                </button>
              </Chip>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

Autocomplete.displayName = "Autocomplete";
