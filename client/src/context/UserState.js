import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState("loading");
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading("not_loading");
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        "http://localhost:4000/api/v1/users/me",
        config
      );
      console.log(res.data.user);
      setUser(res.data.user);
      setIsLoggedIn(true);
      setIsLoading("not_loading");
      return res.data.user;
    } catch (error) {
      window.localStorage.removeItem("token");
      window.location.replace("/");
      console.log(error.response);
    }
  };

  const createPro = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post("http://localhost:4000/api/v1/projects", data, config);
      getUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  const uploadFile = async ({ data, id }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.patch(
        `http://localhost:4000/api/v1/projects/upload/${id}`,
        data,
        config
      );
      getUser();
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateStatus = async ({ data, id }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.patch(
        `http://localhost:4000/api/v1/projects/${id}`,
        data,
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const assignStudents = async ({ data, id }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        `http://localhost:4000/api/v1/users/assign/${id}`,
        data,
        config
      );
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get(
        `http://localhost:4000/api/v1/users/logout`,
        config
      );
      console.log(res);
      setIsLoading("loading");
      setIsLoggedIn(false);
      setUser(null);
      setToken(null);
      window.localStorage.removeItem("token");
      window.location.replace("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  const login = async (payload) => {
    try {
      setUser(payload.user);
      setToken(payload.token);
      setIsLoading("not_loading");
    } catch (error) {}
  };

  return (
    <UserContext.Provider
      value={{
        user: user,
        token: token,
        isLoading: isLoading,
        isLoggedIn: isLoggedIn,
        setUser: login,
        setIsLoading: setIsLoading,
        fetchUser: getUser,
        createProject: createPro,
        upload: uploadFile,
        updateStatus,
        assignStudents,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserCon = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};
