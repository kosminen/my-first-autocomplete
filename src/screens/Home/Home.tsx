import GitHubAutocomplete from "../../components/GitHubAutocomplete";

function Home() {
  return (
    <GitHubAutocomplete
      id="my-first-autocomplete"
      label="Search for GitHub users and repositories"
    />
  );
}

export default Home;
