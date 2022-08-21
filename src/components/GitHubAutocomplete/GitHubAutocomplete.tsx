import { useState } from "react";
import Autocomplete from "../Autocomplete";
import useDebounce from "../../hooks/useDebounce";

import { sortDataListByString } from "./GitHubAutocomplete.helpers";
import useGitHubQuery from "./useGithubQuery";

import "./GitHubAutocomplete.scss";
import "./OpinionatedTheme/OpinionatedTheme.scss";

interface GitHubAutocompleteProps {
  id: string;
  label: string;
}

function GitHubAutocomplete(props: GitHubAutocompleteProps) {
  let message = "";

  const [value, setValue] = useState("");

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const debouncedQueryTerm = useDebounce(() => {
    return value.length >= 3 ? value : "";
  }, 500);

  const query = useGitHubQuery({ query: debouncedQueryTerm });
  const dataList = query.isSuccess
    ? sortDataListByString(query.data, "label")
    : [];

  if (query.isSuccess) {
    message = `${dataList.length} items found.`;
  }

  if (query.isLoading) {
    message = "Loading …";
  }

  if (query.isError) {
    // TODO: Maybe a more helpful error message.
    message = "Something went wrong while fetching results!";
  }

  return (
    <div className="github-autocomplete">
      <Autocomplete
        {...props}
        message={message}
        renderItem={(item) => (
          <a href={item.url}>
            <span className="label">{item.label}</span>
            <span className="additional-info">{item.additionalInfo}</span>
            <span className="url">{item.url}</span>
          </a>
        )}
        dataList={dataList.slice(0, 50)}
        onChange={onValueChange}
        value={value}
      />
    </div>
  );
}

export default GitHubAutocomplete;
