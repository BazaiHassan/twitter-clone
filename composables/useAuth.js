import { jwtDecode } from "jwt-decode";

export default () => {
  // Save user info
  const useAuthToken = () => useState("auth_token");
  const useAuthUser = () => useState("auth_user");
  const useAuthLoading = () => useState("auth_loading", () => true);

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

  // update auth loading
  const setIsAuthLoading = (value) => {
    const authLoading = useAuthLoading();
    authLoading.value = value;
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

  // refresh token
  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await $fetch("/api/auth/refresh");
        setToken(data.access_token);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  // Get user
  const getUser = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await useFetchApi("/api/auth/user");
        setUser(data.user);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  };

  // To regenerate access token every 14 min
  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if(!authToken.value){
      return
    }

    const jwt = jwtDecode(authToken.value)
    
    const newRefreshTime = jwt.exp - 60000

    setTimeout(async() => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime);

  }

  const initAuth = () => {
    return new Promise(async (resolve, reject) => {
        setIsAuthLoading(true)
      try {
        await refreshToken();
        await getUser();

        reRefreshAccessToken()

        resolve(true);
      } catch (error) {
        reject(error);
      }finally{
        setIsAuthLoading(false)
      }
    });
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    useAuthLoading
  };
};
