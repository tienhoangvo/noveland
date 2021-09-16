import { useRouter } from "next/router";
import { useMemo } from "react";

const useActivePath = ({ level = 0 }) => {
  const { pathname } = useRouter();

  const activePath = useMemo(() => {
    console.log({ pathname });
    const paths = pathname.split("/");

    console.log(paths);
    const index = level + 1;
    if (paths[index] === "") return "/";

    return `/${paths[index]}`;
  }, [pathname, level]);
  return activePath;
};

export default useActivePath;
