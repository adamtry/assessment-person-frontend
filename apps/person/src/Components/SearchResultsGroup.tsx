import React from "react";
import { personSearchResult } from "../Interfaces";

interface Props {
  results: personSearchResult[];
}

export const SearchResultsGroup = (props: Props): JSX.Element => {
  return (
    <>
      {props.results.map((person: personSearchResult, index: number) => {
        return (
          <div className="lbh-body sv-result-wrapper" key={index} data-testid={`result-person-${person.id}`}>
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
              data-testid={`view-${person.id}`}
              href={`/person/${person.id}`}
            >
              View
            </a>
          </div>
        );
      })}
    </>
  );
};
