import { useQueries } from "react-query";

import { mapQueriedItems } from "./useGitHubQuery.helpers";

const USER_SEARCH_URL = "https://api.github.com/search/users";
const REPO_SEARCH_URL = "https://api.github.com/search/repositories";

// TODO: Adjust the retry settings.

interface useGitHubQueryProps {
  query: string;
}

export default function useGitHubQuery({ query }: useGitHubQueryProps) {
  let items = [];

  const fetchUsers = async () => {
    const response = await fetch(
      `${USER_SEARCH_URL}?q=${encodeURIComponent(query)}&per_page=50`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const fetchRepos = async () => {
    const response = await fetch(
      `${REPO_SEARCH_URL}?q=${encodeURIComponent(query)}&per_page=50`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const queries = useQueries([
    {
      queryKey: ["users", query],
      queryFn: fetchUsers,
      enabled: query !== "",
      retry: false,
    },
    {
      queryKey: ["repos", query],
      queryFn: fetchRepos,
      enabled: query !== "",
      retry: false,
    },
  ]);

  const isLoading = queries.some((result) => result.isLoading);
  const isError = queries.some((result) => result.isError);
  const isIdle = queries.some((result) => result.isIdle);
  const isSuccess = queries.every((result) => result.isSuccess);

  if (!isSuccess) {
    items = [];
  }

  if (isSuccess) {
    items = queries.map((q) => q.data.items).flat(1);
  }

  return {
    isLoading,
    isError,
    isIdle,
    isSuccess,
    queries,
    data: mapQueriedItems(items),
  };
}
