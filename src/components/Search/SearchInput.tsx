import { Stack, TextField } from "@mui/material";
import React, { ReactElement } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
  isLoading: boolean;
  searchWasClicked: (text: string) => void;
}

export default function SearchInput({
  isLoading,
  searchWasClicked,
}: Props): ReactElement {
  const [value, setValue] = React.useState<string>("");

  const handleLoadingButtonWasClicked = () => {
    setValue((value) => value.trim());

    searchWasClicked(value.trim());
  };

  return (
    <Stack flexDirection="row" gap={1}>
      <TextField
        fullWidth
        placeholder="Search by book title here ..."
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isLoading}
      />

      <LoadingButton
        loading={isLoading}
        sx={{
          minWidth: (theme) => theme.spacing(20),
        }}
        variant="contained"
        disabled={!value}
        onClick={handleLoadingButtonWasClicked}
      >
        Search
      </LoadingButton>
    </Stack>
  );
}
