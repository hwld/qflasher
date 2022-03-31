import { useLoadingEffect } from "@/hooks/useLoadingEffect";

type Props = { isLoading: boolean };
export const AppLoading: React.VFC<Props> = ({ isLoading }) => {
  useLoadingEffect(isLoading);
  return null;
};
