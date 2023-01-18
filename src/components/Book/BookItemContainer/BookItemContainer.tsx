import { Box, CircularProgress, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import {
  useDisplayBookInfoQuery,
  useLazyDisplayBookInfoQuery,
} from "../../../store/apis/book/book.api";
import { BookItem } from "../Book.item";

interface Props {
  ISBN: string;
}

export default function BookItemContainer({ ISBN }: Props): ReactElement {
  const [fetchBookItem, { isLoading, isError, data }] =
    useLazyDisplayBookInfoQuery();

  const [isLoadingApi, setIsLoadingApi] = React.useState<boolean>(true);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      fetchBookItem({ ISBN }).then(() => {
        setIsLoadingApi(false);
      });
    }, 1000);

    return () => {
      clearTimeout(timeout)
    }
  }, []);

  if (isLoading || isLoadingApi) return <CircularProgress />;

  if (!data || isError)
    return <Typography>Something went wrong please try again later</Typography>;

  return <BookItem book={data} />;
}
