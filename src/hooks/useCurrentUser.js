import useSWR from "swr";
import fetcher from "../lib/fetcher";

const getKey = () => "/api/users/me";

const useCurrentUser = () => {
  const { data, error, mutate } = useSWR(getKey, fetcher);

  const loading = !data && !error;

  return {
    currentUser: data || null,
    error,
    mutate,
    loading,
  };
};

export default useCurrentUser;
