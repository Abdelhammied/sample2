import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { Book } from "../../models/Book.model";

interface Props {
  book: Book;
}

export const BookItem = ({ book }: Props) => {
  return (
    <Stack
      flexDirection="row"
      gap={1}
      alignItems="center"
      justifyContent="center"
    >
      {book.thumbnail_url && (
        <Avatar
          alt={book.details.title}
          src={book.thumbnail_url}
          sx={{ width: 56, height: 56, zIndex: 1 }}
        />
      )}

      <List sx={{ m: 0 }}>
        <ListItem>
          <ListItemText primary={book.details.title} />
        </ListItem>

        {book.details.publish_date && (
          <ListItem>
            <ListItemText
              primary="Publish date"
              secondary={book.details.publish_date}
            />
          </ListItem>
        )}

        {book.details.authors && (
          <ListItem>
            <ListItemText
              primary={
                <Typography className="MuiListItemText-primary">
                  Authors
                </Typography>
              }
              disableTypography
              secondary={
                <List>
                  {book.details.authors.map((author) => (
                    <ListItemText key={author.key} secondary={author.name} />
                  ))}
                </List>
              }
            />
          </ListItem>
        )}

        {book.details.physical_format && (
          <ListItem>
            <ListItemText
              primary="Physical format"
              secondary={book.details.physical_format}
            />
          </ListItem>
        )}

        {book.details.number_of_pages && (
          <ListItem>
            <ListItemText
              primary="Number of pages"
              secondary={book.details.number_of_pages}
            />
          </ListItem>
        )}

        {book.details.weight && (
          <ListItem>
            <ListItemText primary="Weight" secondary={book.details.weight} />
          </ListItem>
        )}
      </List>
    </Stack>
  );
};
