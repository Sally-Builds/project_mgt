import React, { useEffect, useContext } from "react";
import Router from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./context/UserState";

function App() {
  const { isLoading } = useContext(UserContext);
  return (
    <>
      {isLoading === "loading" ? (
        <div>loading</div>
      ) : (
        <div>
          <Router />
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default App;
