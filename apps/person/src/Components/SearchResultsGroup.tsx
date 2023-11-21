import React, { useState } from "react";
import { personSearchResult } from "../Interfaces";
import { doc } from "prettier";

interface Props {
  results: personSearchResult[];
  setUnmergeError: () => void;
}

export const SearchResultsGroup = (props: Props): JSX.Element => {

  return (
    <>
      {props.results.map((person: personSearchResult, index: number) => {

        return (
          <>
            <div className="lbh-body sv-result-wrapper" key={index}>
              <div className="sv-result-sub-wrapper">
                <div className="sv-result">
                  <strong>
                    {person.firstName} {person.lastName}
                  </strong>
                  <div className="lbh-body-s govuk-!-margin-top-1">
                    <span>
                     <p>{person.email}</p>
                    </span>
                  </div>
                </div>
              </div>
                <a
                  className="govuk-button"
                  data-testid="unmerge"
                  href={`/person/${person.id}`}
                >
                  View
                </a>
            </div>
          </>
        );
      })}
    </>
  );
};
