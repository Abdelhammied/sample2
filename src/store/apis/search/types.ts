import { Search } from "../../../models/Search.model";

export type SearchRequest = {
  request: {
    title: string;
    page: number;
  };
  response: Search;
};
