import {
  DragSourceHookSpec,
  DropTargetHookSpec,
  useDrag,
  useDrop,
} from "react-dnd";

const Tag = "tag";
type TagItem = { id: string };

const useTagDrag = <DropResult, CollectedProps>(
  spec: () => Omit<
    DragSourceHookSpec<TagItem, DropResult, CollectedProps>,
    "type"
  >,
  deps?: unknown[]
) => {
  return useDrag<TagItem, DropResult, CollectedProps>(() => {
    return { type: Tag, ...spec() };
  }, deps);
};

const useTagDrop = <DropResult, CollectedProps>(
  spec: () => Omit<
    DropTargetHookSpec<TagItem, DropResult, CollectedProps>,
    "accept"
  >,
  deps?: unknown[]
) => {
  return useDrop<TagItem, DropResult, CollectedProps>(() => {
    return { accept: Tag, ...spec() };
  }, deps);
};

export { useTagDrag, useTagDrop };
