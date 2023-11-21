import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchPerson } from "../../Gateways";
import { Input } from "../../Components";
import { personSearchResult } from "../../Interfaces";

interface myProps {
  setResultsFunction: (searchResults: personSearchResult[]) => void;
  query: string | null;
}

export const SearchByResident = (props: myProps): JSX.Element => {
  const [query, setQuery] = useState(props.query || "");
  const [searching, setIsSearching] = useState<boolean>(false);
  const [noSearchInputWarning, setNoSearchInputWarning] =
    useState<boolean>(false);

  const searchInput: boolean = ![query].every((value) => value === "");

  const history = useHistory();

  function clearSearchData() {
    window.history.pushState({}, document.title, "/search");
    const header = document.getElementById(
      "single-spa-application:@mfe/header"
    );
    setQuery("");
    setNoSearchInputWarning(false);
    header && header.scrollIntoView();
  }

  function searchForPerson() {
    if (query) {
      handleSearch()
        .then((r) => {
          const section = document.querySelector("#results");
          section?.scrollIntoView();
        })
        .finally(() => {
          setIsSearching(false);
        });
      setIsSearching(true);
    }
  }

  const handleSearch = async () => {
    try {
      let searchResults = await SearchPerson({
        query: query.trim(),
      });
      props.setResultsFunction(searchResults);
      setIsSearching(false);
    } catch (e) {
      setIsSearching(false);
      console.log(e);
    }
  };

  return (
    <>
      <div className="govuk-grid-row">
        <div
          className="govuk-grid-column-one-third"
          style={{ minWidth: "400px" }}
        >
          <form
            onReset={() => {
              clearSearchData();
            }}
            onSubmit={(e) => {
              e.preventDefault();

              if (!searchInput) {
                setNoSearchInputWarning(true);
                return;
              }

              setIsSearching(true);

              let path = `/search?query=${query.trim()}`;
              history.push(path);
              searchForPerson();
              window.document.cookie = `searchResidentPath=${path}`;
            }}
          >
            <Input
              label="Search for a person"
              id="searchField"
              name="searchField"
              value={props.query || ""}
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              error={noSearchInputWarning}
              errorMsg="Please enter a name or email address"
            />
            {searching ? (
              <div className="sv-spinner">
                <svg
                  viewBox="0 0 42 42"
                  stroke="#00703c"
                  width="50"
                  height="50"
                >
                  <g fill="none" fillRule="evenodd">
                    <g transform="translate(3 3)" strokeWidth="5">
                      <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                      <path
                        d="M36 18c0-9.94-8.06-18-18-18"
                        transform="rotate(112.708 18 18)"
                      />
                    </g>
                  </g>
                </svg>
              </div>
            ) : (
              <div className="govuk-button-group">
                {[
                  <button
                    id={"clearSearchButton"}
                    data-testid={"clearSearchButton"}
                    className="govuk-button lbh-button--secondary"
                    type="reset"
                  >
                    Clear Search
                  </button>,
                  <button
                    type="submit"
                    data-testid="searchButton"
                    className="govuk-button lbh-button govuk-button--start"
                  >
                    Search
                    <svg
                      className="govuk-button__start-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.5"
                      height="19"
                      viewBox="0 0 33 40"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="currentColor"
                        d="M0 0h13l20 20-20 20H0l20-20z"
                      />
                    </svg>
                  </button>,
                ]}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
