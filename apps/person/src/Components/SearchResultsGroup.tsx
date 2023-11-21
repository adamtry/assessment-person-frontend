import React, { useState } from "react";
import { formatDate } from "@mfe/common/lib/utils";
import { personSearchResult } from "../Interfaces";
import { UnmergeRecordButton } from "./UnmergeRecordButton";
import { searchPersonDataSource } from "../Utils/searchPersonDataSource";
import { humanize } from "../Utils";
import { isNullOrEmpty } from "../Utils/isNullOrEmpty";

interface Props {
  results: personSearchResult[];
  setUnmergeError: () => void;
}

export const SearchResultsGroup = (props: Props): JSX.Element => {
  const [unmergeRecordPersonId, setUnmergeRecordPersonId] = useState<string>();

  return (
    <>
      {props.results.map((person: personSearchResult, index: number) => {
        let recordWithUnmergeRecordPersonId: boolean =
          person.id == unmergeRecordPersonId;

        return (
          <>
            <div className="lbh-body sv-result-wrapper" key={index}>
              <div className="sv-result-sub-wrapper">
                <div className="sv-result">
                  <a
                    href={`/person/${person.id}`}
                    className="lbh-link lbh-link--no-visited-state"
                  >
                    {person.firstName} {person.lastName}
                  </a>
                  <div className="lbh-body-s govuk-!-margin-top-1">
                    <span>
                     <p>Hello</p>
                    </span>
                  </div>
                </div>
              </div>

              {!recordWithUnmergeRecordPersonId && (
                <button
                  onClick={() => {
                    setUnmergeRecordPersonId(person.id);
                  }}
                  className="govuk-button govuk-button--warning sv-unmerge-button"
                  data-testid="unmerge"
                >
                  Unmerge
                </button>
              )}

              {recordWithUnmergeRecordPersonId && (
                <UnmergeRecordButton
                  svId={person.id}
                  setUnmergeError={props.setUnmergeError}
                  unmergeRecordPersonId={setUnmergeRecordPersonId}
                />
              )}
            </div>
          </>
        );
      })}
    </>
  );
};
