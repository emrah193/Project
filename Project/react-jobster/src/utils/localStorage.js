export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};
export const getUserFromLocalStorage = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser ? JSON.parse(localUser) : null;
  return user;
};
