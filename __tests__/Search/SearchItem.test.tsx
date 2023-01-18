import { expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchItem from "../../src/components/Search/SearchItem/SearchItem";

import docs from "../data/docs.json";
import { SearchDocsItem } from "../../src/models/Search.model";

it(`
    Component is rendered with main data, 
    the popper shows with additional info 
    and without additional info`, async () => {
  let selectedDoc = docs[0] as SearchDocsItem;

  const searchItemComponent = render(<SearchItem doc={selectedDoc} />);

  expect(screen.getByText(selectedDoc.title)).toBeInTheDocument();
  expect(screen.getByAltText(selectedDoc.title)).toBeInTheDocument();

  fireEvent.mouseEnter(screen.getByText(selectedDoc.title));

  await waitFor(() => {
    expect(
      searchItemComponent.container.querySelector(
        `#transition-popper-${selectedDoc.key.replaceAll("/", "-")}`
      )
    ).toBeInTheDocument();

    expect(screen.getByText(selectedDoc.title)).toBeInTheDocument();
  });

  delete selectedDoc["isbn"];

  render(<SearchItem doc={selectedDoc} />, {
    container: searchItemComponent.container,
  });

  fireEvent.mouseEnter(screen.getByText(selectedDoc.title));

  await waitFor(() => {
    expect(
      searchItemComponent.container.querySelector(
        `#transition-popper-${selectedDoc.key.replaceAll("/", "-")}`
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("No additional info exists for this book")
    ).toBeInTheDocument();
  });
});
