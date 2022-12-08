export const isValidToken = (token) => {
  const cTs = Math.floor(Date.now() / 1000);
  return token >= cTs;
};

export const getCurrentToken = () => {
  return sessionStorage.getItem("token");
};

export const headerConfig = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};
