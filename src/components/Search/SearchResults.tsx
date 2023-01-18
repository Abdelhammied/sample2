import { Stack, Table, TableCell, TableHead, TableRow } from "@mui/material";
import React, { ReactElement } from "react";
import { Book } from "../../models/Book.model";
import { Search } from "../../models/Search.model";
import { BookItem } from "../Book/Book.item";
import SearchItem from "./SearchItem/SearchItem";

interface Props {
  docs: Search["docs"];
}

export default function SearchResults({ docs }: Props): ReactElement {
  return (
    <Stack flexDirection="row" gap={1} flexWrap="wrap" justifyContent="center">
      {docs.map((doc) => (
        <SearchItem key={doc.key} doc={doc} />
      ))}
    </Stack>
  );
}
