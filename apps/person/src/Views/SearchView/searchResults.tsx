import React, { useState, useEffect } from "react";
import { personSearchResult } from "../../Interfaces";
import { Pagination } from "../../Components";
import { SearchResultsGroup } from "../../Components/SearchResultsGroup";

interface myProps {
  results: personSearchResult[];
  maxSearchResults: number;
}

export const SearchResults = (props: myProps): JSX.Element => {
  const sliceIntoChunks = (arr: any, chunkSize: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  };
  const [results, setResults] = useState<personSearchResult[]>(
    sliceIntoChunks(props.results, props.maxSearchResults)[0]
  );

  useEffect(() => {
    setResults(sliceIntoChunks(props.results, props.maxSearchResults)[0]);
  }, [props.results, props.maxSearchResults]);

  const [splitResults] = useState<personSearchResult[][]>(
    sliceIntoChunks(props.results, props.maxSearchResults)
  );

  const onPageChange = (currentPage: number, isNext: boolean) => {
    if (isNext) {
      setResults(splitResults[currentPage]);
    } else {
      setResults(splitResults[currentPage - 2]);
    }
  };

  let numberOfResults = props.results.length;

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="sv-group">
          <h2 className="lbh-heading-h3 govuk-!-margin-top-7">{`${numberOfResults} results found`}</h2>
        </div>
        <hr />
        <div id="searchResults">
          {results &&
            results.length > 0 && [<SearchResultsGroup results={results} />]}
        </div>
        {numberOfResults > 0 && (
          <Pagination
            total={props.results.length}
            onPageChange={onPageChange}
            pageSize={props.maxSearchResults}
          />
        )}
      </div>
    </div>
  );
};
