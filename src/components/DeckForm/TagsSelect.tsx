import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Tag } from "../../types";
import { CreatableSelect } from "../CreatableSelect";
import { DeckFormFields } from "./useDeckForm";

type Props = {
  tags: Tag[];
  control: Control<DeckFormFields>;
  error?: FieldError;
};

export const TagsSelect: React.FC<Props> = ({ tags, control, error }) => {
  const options = tags.map((tag) => ({ value: tag.id, label: tag.name }));

  return (
    <>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <CreatableSelect
            isMulti
            options={options}
            {...field}
            value={field.value?.map((f) => ({ value: f.id, label: f.name }))}
            onChange={(options) => {
              field.onChange(
                options.map((opt) => ({ id: opt.value, name: opt.label }))
              );
            }}
          />
        )}
      />
    </>
  );
};
