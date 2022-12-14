import { useContext } from "react";
import { UserContext } from "../context/UserState";

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
