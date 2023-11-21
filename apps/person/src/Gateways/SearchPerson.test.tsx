import { personSearchResult } from "../Interfaces";
import { SearchPerson } from "./SearchPerson";
import axios from "axios";
jest.mock("axios", () => {
  return {
    get: jest.fn(),
  };
});

const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Person API gateway", () => {
  describe("Search Person", () => {
    it("should return undefined on empty query", async () => {
      const response = { status: 404 };
      mockAxios.get.mockImplementationOnce(async () => response);

      var params = {
        query: "",
      }

      expect(await SearchPerson(params)).toBeUndefined();
    });

    it("should return matched results", async () => {
      const data: personSearchResult[]  = [
        {
          id: "1",
          firstName: "test",
          lastName: "test",
          email: "test.test@test.com",
          gender: "test",
        }
      ]
      const axiosRes = { status: 200, data: data };
      mockAxios.get.mockImplementationOnce(async () => axiosRes);

      var params = {
        query: "test",
      }

      var response = await SearchPerson(params);

      expect(response).toBeDefined();
      expect(response).toEqual(data);
    });
    
  });
});
