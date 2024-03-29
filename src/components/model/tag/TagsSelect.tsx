import { DeckFormFields } from "@/components/model/deck/DeckForm/useDeckForm";
import { UseTagOperationResult } from "@/components/model/tag/useTagOperation";
import { CreatableSelect } from "@/components/ui/CreatableSelect";
import { useConfirm } from "@/context/ConfirmContext";
import { Tag } from "@/models";
import { isOk, Result } from "@/utils/result";
import {
  Box,
  BoxProps,
  Button,
  Flex,
  Tag as TagComponent,
  Text,
  useToken,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { v4 as uuid } from "uuid";

export type TagSelectProps = {
  tags: Tag[];
  control: Control<DeckFormFields>;
  defaultTagIds?: string[];
  error?: FieldError;
  onAddTag: (tag: Tag) => Promise<Result<unknown>>;
  onDeleteTag: UseTagOperationResult["deleteTag"];
  onNextFocus?: () => void;
  onPrevFocus?: () => void;
} & BoxProps;

export const TagsSelect: React.FC<TagSelectProps> = ({
  tags,
  control,
  defaultTagIds = [],
  onAddTag,
  onDeleteTag,
  onNextFocus,
  onPrevFocus,
  ...styles
}) => {
  const confirm = useConfirm();
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
    <Box {...styles}>
      <Controller
        control={control}
        name="tags"
        render={({ field }) => {
          return (
            <CreatableSelect
              isMulti
              closeMenuOnSelect={false}
              options={options}
              {...field}
              onNextFocus={onNextFocus}
              onPrevFocus={onPrevFocus}
              value={field.value?.map((f) => ({ value: f.id, label: f.name }))}
              onChange={(options) => {
                field.onChange(
                  options.map((opt) => ({ id: opt.value, name: opt.label }))
                );
              }}
              isLoading={isLoading}
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
                          confirm({
                            onContinue: () => onDeleteTag(option.value),
                            title: "タグの削除",
                            body: "タグを削除しますか？",
                            continueText: "削除する",
                            cancelText: "キャンセル",
                          });
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
                const result = await onAddTag(newTag);
                if (isOk(result)) {
                  field.onChange([...field.value, newTag]);
                }
                setIsLoading(false);
              }}
            />
          );
        }}
        defaultValue={defaultTags}
      />
    </Box>
  );
};
