export type Book = {
  bib_key: string;
  info_url: string;
  preview: string;
  preview_url: string;
  thumbnail_url?: string;
  details: {
    publishers: string[];
    number_of_pages?: number;
    weight?: string;
    covers: number[];
    physical_format?: string;
    last_modified: {
      type: string;
      value: string;
    };
    latest_revision: number;
    key: string;
    authors?: [
      {
        key: string;
        name: string;
      }
    ];
    languages: [
      {
        key: string;
      }
    ];
    source_records: string[];
    title: string;
    identifiers: {
      librarything: string[];
      wikidata: string[];
      goodreads: string[];
    };
    created: {
      type: string;
      value: string;
    };
    isbn_13: string[];
    isbn_10: string[];
    publish_date?: string;
    works: [
      {
        key: string;
      }
    ];
    type: {
      key: string;
    };
    physical_dimensions: string;
    revision: number;
  };
};
