import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useWithErrorHandling = <_, T>(
  // 任意の関数を受け取って、返す関数と型を一致させる方法がわからなかったので
  // 任意の型の引数を一つだけ取る関数だけ渡せるようにする
  callback: (arg: T) => Promise<void>,
  {
    title,
    description,
  }: {
    title: string;
    description: string;
  }
) => {
  const toast = useToast();

  return useCallback(
    async (arg: T) => {
      try {
        await callback(arg);
      } catch (e) {
        console.error(e);
        toast({ title, description, status: "error" });
      }
    },
    [callback, description, title, toast]
  );
};
