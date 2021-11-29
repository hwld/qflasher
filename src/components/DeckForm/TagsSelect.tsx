import React from "react";
import { Tag } from "../../types";
import { CreatableSelect } from "../CreatableSelect";

type Props = {
  tags: Tag[];
};

export const TagsSelect: React.FC<Props> = ({ tags }) => {
  const options = tags.map((tag) => ({ value: tag.id, label: tag.name }));

  return <CreatableSelect isMulti options={options} />;
};
