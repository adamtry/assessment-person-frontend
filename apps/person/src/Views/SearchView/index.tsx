import React, { useLayoutEffect, useState } from "react";
import { SearchByResident } from "./searchByResident";
import { SearchResults } from "./searchResults";
import { housingSearchPerson, personSearchResult } from "../../Interfaces";
import { locale } from "../../Config/locale";

interface Props {
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  addressLine1: string | null;
  postCode: string | null;
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
        {results ? "Search results for" : "Search person information"}
      </h1>
      <SearchByResident
        setResultsFunction={setResultsFunction}
        firstName={props.firstName}
        lastName={props.lastName}
        addressLine1={props.addressLine1}
        postCode={props.postCode}
        dateOfBirth={props.dateOfBirth}
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
