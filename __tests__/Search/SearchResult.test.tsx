import { expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import docs from "../data/docs.json";
import SearchResults from "../../src/components/Search/SearchResults";
import { SearchDocsItem } from "../../src/models/Search.model";

test("Search results render the docs", () => {
  const { container } = render(
    <SearchResults docs={docs as SearchDocsItem[]} />
  );

  expect(container.querySelectorAll(".doc-container").length).toBe(docs.length);
});
