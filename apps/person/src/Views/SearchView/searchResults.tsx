import React, { useState, useEffect } from "react";
import {
  housingSearchPerson,
  mapRecordsToMatchedRecord,
  personSearchResult,
} from "../../Interfaces";
import { Pagination } from "../../Components";
import { mergeRecords } from "../../Gateways/recordsGateway";
import { ErrorSummary } from "@mfe/common/lib/components";
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

  const [selectedRecords, setSelectedRecords] = useState<personSearchResult[]>(
    []
  );
  const [mergeError, setMergeError] = useState<string | null>(null);
  const [unMergeError, setUnmergeError] = useState<string | null>(null);

  useEffect(() => {
    setMergeError(null);
    setUnmergeError(null);
    setResults(sliceIntoChunks(props.results, props.maxSearchResults)[0]);
    setSelectedRecords([]);
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

  const displayUnmergeError = () => {
    setUnmergeError("Error unmerging selected record. Please try again.");
  };

  const mergeSelectedRecords = async (records: housingSearchPerson[]) => {
    const mappedMatchedRecord = mapRecordsToMatchedRecord(records);
    if (mappedMatchedRecord.error != null) {
      // @ts-ignore
      return setMergeError(mappedMatchedRecord.error);
    }
    try {
      setMergeError(null);
      // @ts-ignore
      const sv_id = await mergeRecords(mappedMatchedRecord.matchedRecord);
      return (window.location.href = `/customers/single-view/${sv_id}`);
    } catch (e) {
      setMergeError("Unable to create merged record. Please search again.");
    }
  };

  let numberOfResults = props.results.length;

  function clearSearchFields() {
    window.history.pushState({}, document.title, "/search");
    const fieldIds = [
      "firstName",
      "lastName",
      "addressLine1",
      "postcode",
      "dateOfBirth",
    ];
    for (let i = 0; i < fieldIds.length; i++) {
      let field = document.getElementById(fieldIds[i]) as HTMLInputElement;
      if (field) {
        field.value = "";
      }
    }
    const header = document.getElementById(
      "single-spa-application:@mfe/header"
    );
    header && header.scrollIntoView();
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="sv-group">
          <h2 className="lbh-heading-h3 govuk-!-margin-top-7">{`${numberOfResults} results found`}</h2>
        </div>
        {mergeError && (
          <ErrorSummary
            id="singleViewMergeError"
            title="Error"
            description={mergeError}
          />
        )}
        {unMergeError && (
          <ErrorSummary
            id="singleViewMergeError"
            title="Error"
            description={unMergeError}
          />
        )}
        <hr />
        <div id="searchResults">
          {results &&
            results.length > 0 && [
              <SearchResultsGroup
                results={results}
                setUnmergeError={displayUnmergeError}
              />,
            ]}
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
