import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BookItem } from "../../src/components/Book/Book.item";

import book from "../data/book.json";
import { Book } from "../../src/models/Book.model";

it("Book item component rendered successfully with all data provided", () => {
  render(<BookItem book={book as Book} />);

  let title = screen.getByText(book.details["title"]);
  expect(title).toBeInTheDocument();

  let publish_date = screen.getByText(book.details["publish_date"]);
  expect(publish_date).toBeInTheDocument();

  let physical_format = screen.getByText(book.details["physical_format"]);
  expect(physical_format).toBeInTheDocument();

  let number_of_pages = screen.getByText(book.details["number_of_pages"]);
  expect(number_of_pages).toBeInTheDocument();

  let weight = screen.getByText(book.details["weight"]);
  expect(weight).toBeInTheDocument();

  let avatar = screen.getByAltText(book.details.title);
  expect(avatar).toBeInTheDocument();

  book.details.authors.forEach((author) => {
    let authorItem = screen.getByText(author.name);

    expect(authorItem).toBeInTheDocument();
  });
});

it("Book component is rendered when some properties are missing", () => {
  let leakDataBook = JSON.parse(JSON.stringify(book)) as Book;

  delete leakDataBook["thumbnail_url"];
  delete leakDataBook["details"]["publish_date"];
  delete leakDataBook["details"]["authors"];
  delete leakDataBook["details"]["physical_format"];
  delete leakDataBook["details"]["number_of_pages"];
  delete leakDataBook["details"]["weight"];

  render(<BookItem book={leakDataBook as Book} />);

  let title = screen.getByText(book.details.title);
  expect(title).toBeInTheDocument();

  let publish_date = screen.queryByText(book.details.publish_date);
  expect(publish_date).not.toBeInTheDocument();

  let physical_format = screen.queryByText(book.details.physical_format);
  expect(physical_format).not.toBeInTheDocument();

  let number_of_pages = screen.queryByText(book.details.number_of_pages);
  expect(number_of_pages).not.toBeInTheDocument();

  let weight = screen.queryByText(book.details.weight);
  expect(weight).not.toBeInTheDocument();

  let avatar = screen.queryByAltText(book.details.title);
  expect(avatar).not.toBeInTheDocument();

  book.details.authors.forEach((author) => {
    let authorItem = screen.queryByText(author.name);
    expect(authorItem).not.toBeInTheDocument();
  });
});
