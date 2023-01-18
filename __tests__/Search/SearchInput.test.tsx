import "whatwg-fetch";
import { expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchInput from "../../src/components/Search/SearchInput";

it("user can use the search input", () => {
  let isLoading = false;

  const handleSearchWasClicked = vi.fn((val: string) => {
    isLoading = true;

    setTimeout(() => {
      isLoading = false;
    }, 2000);
  });

  const searchInputComponent = render(
    <SearchInput
      isLoading={isLoading}
      searchWasClicked={handleSearchWasClicked}
    />
  );

  let searchInput =
    searchInputComponent.container.querySelector("input[type=search]");

  let searchButton = searchInputComponent.container.querySelector("button");

  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toBeDisabled();

  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput as Element, { target: { value: "People" } });
  expect(searchInput).toHaveValue("People");
  expect(searchButton).toBeEnabled();

  fireEvent.click(searchButton as Element);
  render(
    <SearchInput
      isLoading={isLoading}
      searchWasClicked={handleSearchWasClicked}
    />,
    { container: searchInputComponent.container }
  );
  expect(searchInput).toBeDisabled();
  expect(searchButton).toBeDisabled();
});
