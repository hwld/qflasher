import { useDraggingTag } from "@/components/model/tag/useTagDnD";
import { Box, Tag } from "@chakra-ui/react";

export const DragTagLayer: React.VFC = () => {
  const dragObj = useDraggingTag();

  return (
    dragObj && (
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        transform={`translate(${dragObj.currentOffset.x + 10}px,${
          dragObj.currentOffset?.y
        }px)`}
        pointerEvents={"none"}
        zIndex={1}
      >
        <Tag>{dragObj.tag.name}</Tag>
      </Box>
    )
  );
};
