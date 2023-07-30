let token: string | null = null;

export const setAccessToken = (newToken: string) => {
  token = newToken;
};

export const getAccessToken = () => {
  return token;
};
