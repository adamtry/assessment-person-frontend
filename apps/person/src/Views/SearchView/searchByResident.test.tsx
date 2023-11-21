import React from 'react'
import { render } from "@testing-library/react";
import { SearchByResident } from "./searchByResident";

import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    jest.resetModules();
});

describe("Person View", () => {

    test("should render search by residet view", () => {
        const wrapper = render(
            <MemoryRouter>
                <SearchByResident query={"test"} setResultsFunction={jest.fn()} key={0} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.getByText("Search for a person")).toBeInTheDocument();
    });
});