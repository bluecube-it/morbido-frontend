// Utils

export const endpoint = 'backend';

// eslint-disable-next-line consistent-return
export const isTokenExpired = (token) => {
  if (Date.now() >= token.exp * 1000) {
    return true;
  }
};
