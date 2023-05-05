export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("token");
  if (!accessToken) {
    return false;
  }
  const token = JSON.parse(atob(accessToken.split('.')[1]));
  const epochTS = Math.round(new Date().getTime() / 1000);
  return epochTS < token.exp;
};

export const logout = () => {
    localStorage.removeItem("token");
}