import React from 'react'
import { render } from "@testing-library/react";
import { SearchResults } from "./searchResults";

import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    jest.resetModules();
});

describe("Search Results", () => {

    test("should render search results", () => {
        const wrapper = render(
            <MemoryRouter>
                <SearchResults key={0} maxSearchResults={10} results={[]} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.getByText("0 results found")).toBeInTheDocument();
    });
});