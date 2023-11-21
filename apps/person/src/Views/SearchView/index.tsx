import React, { useLayoutEffect, useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { personSearchResult } from "../../Interfaces";
import { locale } from "../../Config/locale";

interface Props {
  query: string | null;
}

export const SearchView = (props: Props): JSX.Element => {
  useLayoutEffect(() => {
    document.title = locale.pageTitles.search;
  });

  const [results, setResults] = useState<personSearchResult[]>();

  const setResultsFunction = (searchResults: personSearchResult[]) => {
    setResults(searchResults);
  };

  return (
    <>
      <h1 className="lbh-heading-h1">
        {results ? "Search results" : "Search person information"}
      </h1>
      <SearchByResident
        setResultsFunction={setResultsFunction}
        query={props.query}
      />
      <div id="results">
        {results && (
          <SearchResults
            results={results}
            maxSearchResults={10}
          />
        )}
      </div>
    </>
  );
};
