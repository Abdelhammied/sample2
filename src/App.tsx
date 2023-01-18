import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { ReactElement } from "react";
import SearchInput from "./components/Search/SearchInput";
import SearchResults from "./components/Search/SearchResults";
import { SearchDocsItem } from "./models/Search.model";
import { useLazySearchQuery } from "./store/apis/search/search.api";

interface Props {}

export default function App({}: Props): ReactElement {
  const [searchText, setSearchText] = React.useState<string>("");
  const [page, setPage] = React.useState<number>(1);

  const [fetchSearchQuery, { isLoading, isFetching, isError, data }] =
    useLazySearchQuery();

  const lastPage = data?.numFound
    ? Math.round(data.numFound / Number(import.meta.env.VITE_ITEMS_PER_PAGE))
    : 1;

  React.useEffect(
    function fetchSearchWhenSearchIsClickedOrPageIsChanged() {
      if (searchText !== "" && searchText) {
        fetchSearchQuery({
          title: searchText,
          page,
        });
      }
    },
    [searchText, page]
  );

  const handleSearchWasClicked = (value: string) => {
    setSearchText(value);

    setPage(1);
  };

  const renderSearchStateResult = () => {
    if (isLoading || isFetching) {
      return <CircularProgress />;
    }

    if (!searchText || searchText === "") {
      return <Typography>Type somthing to start search.</Typography>;
    }

    if (!data || !data.docs.length) {
      return (
        <Typography>There is no data the matches this Criteria</Typography>
      );
    }

    if (isError) {
      return (
        <Typography>Somthing went wrong please try again later !.</Typography>
      );
    }

    return <SearchResults docs={data.docs} />;
  };

  return (
    <>
      <Box marginBottom={2}>
        <SearchInput
          searchWasClicked={handleSearchWasClicked}
          isLoading={isLoading || isFetching}
        />
      </Box>

      <Stack alignItems="center" justifyContent="center">
        {renderSearchStateResult()}
      </Stack>

      {lastPage > 1 && (
        <Stack alignItems="center" marginTop={2}>
          <Pagination
            count={lastPage}
            page={page}
            onChange={(e, p) => {
              setPage(p);
            }}
          />
        </Stack>
      )}
    </>
  );
}
