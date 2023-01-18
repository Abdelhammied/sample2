import {
  Avatar,
  Box,
  CircularProgress,
  Fade,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ReactElement } from "react";
import { SearchDocsItem } from "../../../models/Search.model";
import { HoverItemStyledBox, SearchItemStyledBox } from "./style";

const BookItemContainer = React.lazy(
  () => import("../../Book/BookItemContainer/BookItemContainer")
);

interface Props {
  doc: SearchDocsItem;
}

export default function SearchItem({ doc }: Props): ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleHover = (
    event: React.MouseEvent<HTMLElement>,
    openStatus: boolean
  ) => {
    setAnchorEl(event.currentTarget);
    setOpen(openStatus);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen
    ? `transition-popper-${doc.key.replaceAll("/", "-")}`
    : undefined;

  return (
    <Box className={`doc-container`}>
      <SearchItemStyledBox
        aria-describedby={id}
        onMouseEnter={(e) => handleHover(e, true)}
        onMouseLeave={(e) => handleHover(e, false)}
      >
        {doc?.cover_i && (
          <Avatar
            variant="circular"
            alt={doc.title}
            src={`https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`}
          />
        )}

        <Typography>{doc.title}</Typography>
      </SearchItemStyledBox>

      <Popper
        // disablePortal
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="right-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <HoverItemStyledBox>
              <React.Suspense fallback={<CircularProgress />}>
                {doc?.isbn ? (
                  <BookItemContainer ISBN={doc?.isbn[0]} />
                ) : (
                  <Typography>
                    No additional info exists for this book
                  </Typography>
                )}
              </React.Suspense>
            </HoverItemStyledBox>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
