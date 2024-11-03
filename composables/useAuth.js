export default () => {
  // Save user info
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");

  // update token which is saved in state
  const setToken = (newToken) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  // update user which is saved in state
  const setUser = (newUser) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  // Request To server fo login
  const login = ({ username, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/login", {
          method: "POST",
          body: {
            username,
            password,
          },
        });
        setToken(data.access_token);
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    login,
    useAuthUser
  };
};
