import React from 'react'
import { render } from "@testing-library/react";
import { SearchView } from ".";

import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    jest.resetModules();
});

describe("Search View", () => {

    test("should render search view", () => {
        const wrapper = render(
            <MemoryRouter>
                <SearchView query={"test"} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.getByText("Search person information")).toBeInTheDocument();
    });
});