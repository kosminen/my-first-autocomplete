import { useState, useRef } from "react";
import { useFocusWithin } from "react-aria";
import "./Autocomplete.scss";

// TODO: Maybe a logic, whether to show the datalist over or under the input.
// TODO: There's still a bug in the focusing logic, sometimes pressing arrow does not show the visible focus at first.

interface AutocompleteProps {
  dataList: AutocompleteDataListItem[];
  id: string;
  label: string;
  message?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  renderItem: (item: AutocompleteDataListItem) => JSX.Element;
  value: string;
}

export interface AutocompleteDataListItem {
  id: number;
  label: string;
  [key: string]: any;
}

const defaultFilter = (dataList: AutocompleteDataListItem[], query: string) =>
  dataList.filter((item: AutocompleteDataListItem) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

function Autocomplete({
  dataList = [],
  id,
  label,
  message = "",
  onChange,
  renderItem,
  value = "",
}: AutocompleteProps) {
  const [isFocusWithin, setFocusWithin] = useState(false);
  const list = useRef(null);
  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin),
  });

  const showDataList =
    isFocusWithin && dataList.length > 0 && value.length >= 3;

  const focusToFirstItem = (listElement: HTMLElement | null) => {
    const firstItem = listElement?.querySelector(
      ".autocomplete__datalist a"
    ) as HTMLAnchorElement | null;
    firstItem?.focus();
  };

  const onKeyArrowDown = () => {
    const listElement = list.current as HTMLElement | null;
    const activeElement = document.activeElement;
    const isListItemFocused = listElement?.contains(activeElement) || false;

    if (!isListItemFocused) {
      focusToFirstItem(listElement);
    }

    if (isListItemFocused) {
      const itemContainer = activeElement?.closest(
        ".autocomplete__datalist__item"
      );
      const nextItemContainer = itemContainer?.nextElementSibling;
      nextItemContainer?.querySelector("a")?.focus();
    }
  };

  const onKeyArrowUp = () => {
    const listElement = list.current as HTMLElement | null;
    const activeElement = document.activeElement;
    const isListItemFocused = listElement?.contains(activeElement) || false;

    if (!isListItemFocused) {
      focusToFirstItem(listElement);
    }

    if (isListItemFocused) {
      const itemContainer = activeElement?.closest(
        ".autocomplete__datalist__item"
      );
      const prevItemContainer = itemContainer?.previousElementSibling;
      prevItemContainer?.querySelector("a")?.focus();
    }
  };

  const onKeyPressed = (e: React.KeyboardEvent) => {
    if (showDataList && e.key === "ArrowDown") {
      e.preventDefault();
      onKeyArrowDown();
    }

    if (showDataList && e.key === "ArrowUp") {
      e.preventDefault();
      onKeyArrowUp();
    }
  };

  return (
    <div
      className={`autocomplete  autocomplete--${id}  is--${
        showDataList ? "open" : "closed"
      }`}
      onKeyDown={onKeyPressed}
      {...focusWithinProps}
    >
      <label htmlFor={id}>{label}</label>

      <div className="autocomplete__combo-box">
        <input
          autoComplete="off"
          autoCapitalize="none"
          id={id}
          name={id}
          type="text"
          value={value}
          onChange={onChange}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDataList}
        />

        <ul
          ref={list}
          className="autocomplete__datalist"
          role="listbox"
          aria-hidden={!showDataList}
        >
          {dataList.map((item) => (
            <li key={item.id} className="autocomplete__datalist__item">
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" role="status" className="autocomplete__message">
        {message}
      </div>
    </div>
  );
}

export default Autocomplete;
