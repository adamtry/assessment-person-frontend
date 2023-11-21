import axios from "axios";
import { personSearchResult } from "../Interfaces";
import { getToken } from "../Utils/getHackneyToken";

export const getPerson = async (
  id: string
): Promise<personSearchResult | null> => {
  try {
    let response = await axios.get(`${process.env.API_URL}/residents/all`, {
      headers: {
        Authorization: `${getToken()}`,
      },
    });

    var allPeople = response.data as personSearchResult[];
    var person = allPeople.find((person) => person.id == id);

    if (response?.status != 200) {
      throw new Error("Error retrieving person");
    }

    if (!person) {
      return null;
    }

    return person;
  } catch (e) {
    return null;
  }
};
