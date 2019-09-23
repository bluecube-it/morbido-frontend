// Utils

export const endpoint = 'http://backend';

// eslint-disable-next-line consistent-return
export const isTokenExpired = (token) => {
  if (Date.now() >= token.exp * 1000) {
    return true;
  }
};
