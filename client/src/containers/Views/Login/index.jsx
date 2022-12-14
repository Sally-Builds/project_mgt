import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../../context/UserState";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState("");
  const [loginIdError, setLoginIdError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUser } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();

    if (loginId == "") {
      setLoginIdError("Please enter your staffID/RegNO");
    }

    if (password.length < 8) {
      setPasswordError("Password must be up to 8 characters ");
    }

    try {
      const loginCred = {
        loginId,
        password,
      };
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        loginCred
      );
      localStorage.setItem("token", res.data.token);
      setUser({ user: res.data.user, token: res.data.token });
      navigate(`/dashboard/${res.data.user.role}`);
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      } else {
        toast.error("Error! Something went wrong", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          {/* Nacoss Futo */}
          Computer Science Futo
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={login}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  StaffID/RegNO
                </label>
                <input
                  type="text"
                  id="email"
                  className={
                    loginIdError
                      ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  }
                  placeholder="2017/234892"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
                <p className="text-red-500 text-xs italic">{loginIdError}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={
                    passwordError
                      ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="/"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-blue-400 bg-primary-600 hover:bg-grey-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
