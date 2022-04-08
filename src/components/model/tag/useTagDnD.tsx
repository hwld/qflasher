import { Tag } from "@/models";
import {
  DragSourceHookSpec,
  DropTargetHookSpec,
  useDrag,
  useDragLayer,
  useDrop,
} from "react-dnd";

const TagType = "tag";

const useTagDrag = <DropResult, CollectedProps>(
  spec: () => Omit<DragSourceHookSpec<Tag, DropResult, CollectedProps>, "type">,
  deps?: unknown[]
) => {
  return useDrag<Tag, DropResult, CollectedProps>(() => {
    return { type: TagType, ...spec() };
  }, deps);
};

const useTagDrop = <DropResult, CollectedProps>(
  spec: () => Omit<
    DropTargetHookSpec<Tag, DropResult, CollectedProps>,
    "accept"
  >,
  deps?: unknown[]
) => {
  return useDrop<Tag, DropResult, CollectedProps>(() => {
    return { accept: TagType, ...spec() };
  }, deps);
};

const useDraggingTag = () => {
  const { data, itemType, currentOffset, isDragging } = useDragLayer(
    (monitor) => ({
      data: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging || itemType !== TagType || !currentOffset) {
    return null;
  }

  //
  if (
    !(
      data &&
      data.id &&
      data.name &&
      typeof data.id === "string" &&
      typeof data.name === "string"
    )
  ) {
    return null;
  }

  return { tag: data as Tag, currentOffset };
};

export { useTagDrag, useTagDrop, useDraggingTag };
