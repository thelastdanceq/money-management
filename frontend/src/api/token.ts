import { getItem, setItem } from "../utils/localStorageHelpers.ts";

let token: string | null = getItem('jwtToken') ?? null;

export const setAccessToken = (newToken: string) => {
  token = newToken;
  setItem('jwtToken', token);
};

export const getAccessToken = () => {
  return token;
};
