// Utils

export const endpoint = process.env.VUE_APP_BACKEND_ENDPOINT;

// eslint-disable-next-line consistent-return
export const isTokenExpired = (token) => {
  if (Date.now() >= token.exp * 1000) {
    return true;
  }
};
