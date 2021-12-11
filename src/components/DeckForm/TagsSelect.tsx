import {
  Button,
  Flex,
  Tag as TagComponent,
  Text,
  useToken,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { UseTagsResult } from "../../hooks/useTags";
import { Tag } from "../../types";
import { CreatableSelect } from "../CreatableSelect";
import { DeckFormFields } from "./useDeckForm";

type Props = {
  tags: Tag[];
  control: Control<DeckFormFields>;
  defaultTagIds?: string[];
  error?: FieldError;
  onAddTag: UseTagsResult["addTag"];
  onDeleteTag: UseTagsResult["deleteTag"];
};

export const TagsSelect: React.FC<Props> = ({
  tags,
  control,
  defaultTagIds = [],
  onAddTag,
  onDeleteTag,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const options = tags.map((tag) => ({ value: tag.id, label: tag.name }));
  const gray300 = useToken("colors", "gray.300");

  const defaultTags: Tag[] = useMemo(
    () =>
      defaultTagIds.map((defaultTagId) => {
        const tag = tags.find((tag) => tag.id === defaultTagId);
        if (!tag) {
          throw new Error();
        }
        return tag;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => {
          return (
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
              isLoading={isLoading}
              isDisabled={isLoading}
              formatOptionLabel={(option, { context }) => {
                if (
                  context === "menu" &&
                  (option as typeof option & { __isNew__?: boolean }).__isNew__
                ) {
                  return (
                    <Flex>
                      <Text>新規作成:</Text>
                      <TagComponent ml={3}>{option.label}</TagComponent>
                    </Flex>
                  );
                } else if (context === "menu") {
                  return (
                    <Flex justify="space-between" align="center" w="100%">
                      <TagComponent h="24px">{option.label}</TagComponent>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTag(option.value);
                        }}
                      >
                        削除
                      </Button>
                    </Flex>
                  );
                }
                return option.label;
              }}
              // formatOptionLabelでスタイリングするためにここで値だけを返す
              formatCreateLabel={(name) => name}
              noOptionsMessage={() => "タグが存在しません"}
              styles={{
                placeholder: (provided) => ({ ...provided, color: gray300 }),
                noOptionsMessage: (provided) => ({
                  ...provided,
                  color: gray300,
                }),
              }}
              onCreateOption={async (name) => {
                setIsLoading(true);
                const newTag = { id: uuid(), name };
                await onAddTag(newTag);
                field.onChange([...field.value, newTag]);
                setIsLoading(false);
              }}
            />
          );
        }}
        defaultValue={defaultTags}
      />
    </>
  );
};
