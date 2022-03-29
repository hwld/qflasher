import { Route } from "@/routes";
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = { href: Route };
export const Redirect: React.VFC<Props> = ({ href }) => {
  const router = useRouter();
  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return null;
};
