import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerson } from "../../Gateways";
import { UrlParams, personSearchResult } from "../../Interfaces";
import { DescriptionListItem, NotFound } from "../../Components";
import { BackToSearch } from "../../Components/BackToSearch";

export const PersonView = () => {
  let { id } = useParams<UrlParams>();
  const [person, setPerson] = useState<personSearchResult | null>();

  useEffect(() => {
    loadPerson();
  }, []);

  const loadPerson = async (): Promise<personSearchResult | null> => {
    try {
      let person = await getPerson(id);
      setPerson(person);

      if (!person) {
        return null;
      }

      return person;
    } catch (e) {
      setPerson(null);
      throw e;
    }
  };

  return person === null ? (
    <NotFound />
  ) : (
    <>
      <div className="govuk-tabs lbh-tabs sv-space-t" data-module="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>

        <div className="govuk-!-margin-bottom-5">
          <BackToSearch />
          <a
            href="/"
            id="new-search"
            className={
              "govuk-link lbh-link lbh-link--no-visited-state govuk-!-margin-left-2"
            }
          >
            New search
          </a>
        </div>

        <h1>
          {person?.firstName} {person?.lastName}
        </h1>
        <DescriptionListItem title={"Email"} testId={"emailField"}>
          {person?.email}
        </DescriptionListItem>
        <DescriptionListItem title={"Gender"} testId={"genderField"}>
          {person?.gender}
        </DescriptionListItem>
      </div>
    </>
  );
};
