import { useLoadingEffect } from "@/hooks/useLoadingEffect";
import { useEffect, useState } from "react";

export const useInitLoadingEffect = () => {
  const [init, setInit] = useState(true);

  useEffect(() => {
    setInit(false);
  }, []);

  useLoadingEffect(init);
};
