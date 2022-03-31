import { useAppRouter } from "@/hooks/useAppRouter";
import { Route } from "@/routes";
import { useEffect } from "react";

type Props = { href: Route };
export const Redirect: React.VFC<Props> = ({ href }) => {
  const router = useAppRouter();
  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return null;
};
