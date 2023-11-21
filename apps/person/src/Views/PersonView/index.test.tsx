import React from 'react'
import { render } from "@testing-library/react";
import {PersonView} from ".";

import * as GetPerson from "../../Gateways/GetPerson";
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    jest.resetModules();

    jest.mock("axios", () => {
        return {
            get: jest.fn(),
        };
    });

    jest.spyOn(GetPerson, 'getPerson').mockImplementation(() => {
        return Promise.resolve({
            id: "1",
            firstName: "Test",
            lastName: "User",
            email: "test.user@email.com",
            gender: "None",
        });
    });
});

describe("Person View", () => {

    test("should render person view", () => {
        const wrapper = render(
            <MemoryRouter>
                <PersonView />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
    });
});