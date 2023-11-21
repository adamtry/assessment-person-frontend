import axios from "axios";
import { getToken } from "../Utils/getHackneyToken";
import { personSearchResult } from "../Interfaces";

interface params {
  firstName: string;
  lastName: string;
  address: string | null;
  jigsawToken: string | null;
  dateOfBirth: string | null;
}

export const SearchPerson = async (
  params: params
): Promise<personSearchResult[]> => {
  let requestUrl = `${process.env.API_URL}/residents/search?query=${params.firstName}`;
  const response = await axios.get(requestUrl, {
    headers: {
      authorization: `${getToken()}`,
    },
  });

  const results: personSearchResult[] = response.data;

  return results;
};
