import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
  user: null,
  token: window.localStorage.getItem("token"),
  isLoading: "loading",
  isLoggedIn: false,
};

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [user, setUsers] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoadings] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  function setUser(payload) {
    dispatch({
      type: "SET_USER",
      payload,
    });
  }

  async function fetchUser() {
    getUser().then((res) => {
      dispatch({
        type: "FETCH_USER",
        payload: res,
      });
      setIsLoading("not_loading");
    });
  }

  function upload(payload) {
    uploadFile(payload).then((res) => {
      dispatch({
        type: "FETCH_USER",
        payload: res,
      });
      setIsLoading("not_loading");
    });
  }

  function setIsLoading(payload) {
    dispatch({
      type: "SET_IS_LOADING",
      payload,
    });
  }

  function createProject(payload) {
    createPro(payload).then((res) => {
      fetchUser();
    });
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        token: state.token,
        isLoading: state.isLoading,
        isLoggedIn: state.isLoggedIn,
        setUser,
        setIsLoading,
        fetchUser,
        createProject,
        upload,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.get(
      "http://localhost:4000/api/v1/users/me",
      config
    );
    console.log("gotten user");
    localStorage.setItem("role", res.data.user.role);
    return res.data.user;
  } catch (error) {
    console.log(error.response);
  }
};

const createPro = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await axios.post(
      "http://localhost:4000/api/v1/projects",
      data,
      config
    );
    return res;
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
    const res = await axios.patch(
      `http://localhost:4000/api/v1/projects/upload/${id}`,
      data,
      config
    );
    console.log(res);
    return "res";
  } catch (error) {
    console.log(error.response);
  }
};

export const UserCon = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useShop must be used within ShopContext");
  }

  return context;
};
