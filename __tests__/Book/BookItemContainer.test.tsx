import { expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import BookItemContainer from "../../src/components/Book/BookItemContainer/BookItemContainer";
import book from "../data/book.json";
import { Provider } from "react-redux";
import { store } from "../../src/store/store.config";
import { BookItem } from "../../src/components/Book/Book.item";
import { Book } from "../../src/models/Book.model";

import "whatwg-fetch";

it("Shows loading, then preview the book item.", async () => {
  let { bib_key } = book;
  let [text, ISBN] = bib_key.split(":");

  const { container } = render(
    <Provider store={store}>
      <BookItemContainer ISBN={ISBN} />
    </Provider>
  );

  // ** Circular Loader shows
  expect(
    container.getElementsByClassName("MuiCircularProgress-root").length
  ).toBe(1);

  // ** Component is rendered and the title apears
  await waitFor(() => {
    expect(screen.queryByText(book.details.title)).toBeInTheDocument();
  });
});

it("shows and error if the request failed or not data exists", async () => {
  render(
    <Provider store={store}>
      <BookItemContainer ISBN={"INVALID_ISBN"} />
    </Provider>
  );

  await waitFor(() => {
    expect(
      screen.getByText("Something went wrong please try again later")
    ).toBeInTheDocument();
  });
});
