import { Book } from "../../../models/Book.model";

export type DisplayBookInfoRequest = {
  request: {
    ISBN: string;
  };

  response: Book;
};
