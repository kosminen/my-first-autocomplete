import { AutocompleteDataListItem } from "../Autocomplete";

export const sortDataListByString = (
  list: Array<any>,
  key: string
): AutocompleteDataListItem[] => {
  return list.sort((a, b) => {
    const valueA = a[key].toLowerCase() || "";
    const valueB = b[key].toLowerCase() || "";

    if (valueA < valueB) {
      return -1;
    }

    if (valueA > valueB) {
      return 1;
    }

    return 0;
  });
};
