import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/UserState";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Index = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");

  const [role, setRole] = useState("");
  const [roleError, setRoleError] = useState("");

  const [staffID, setStaffID] = useState("");
  const [staffIDError, setStaffIDError] = useState("");

  const [regNO, setRegNO] = useState("");
  const [regNOError, setRegNOError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const register = async (e) => {
    e.preventDefault();
    setRoleError("");
    setFullNameError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setStaffIDError("");
    setRegNOError("");

    if (role === "Select your role") {
      setRoleError("Please enter your role");
    }

    if (!fullName) {
      setFullNameError("Please enter your role");
    }

    if (password.length < 8) {
      setPasswordError("Password must be up to 8 characters ");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password does not match");
    }

    if (role === "staff" && !staffID) {
      setStaffIDError("Please enter your staffID");
    }

    if (role === "student" && !regNO) {
      setRegNOError("Please enter your regNO");
    }
    const data = {
      role,
      fullName,
      password,
      confirmPassword,
    };

    if (role === "student") data.regNO = regNO;
    if (role === "staff") {
      data.role = "lecturer";
      data.staffID = staffID;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        data
      );
      localStorage.setItem("token", res.data.token);
      setUser({ user: res.data.data.user, token: res.data.token });
      window.location.replace(`/dashboard/${res.data.data.user.role}`);
    } catch (error) {
      console.log(error);
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
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Computer Science Futo
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={register}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={
                      roleError
                        ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    }
                  >
                    <option defaultValue="">Select your role</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                  </select>
                  <p className="text-red-500 text-xs italic">{roleError}</p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={
                      fullNameError
                        ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    }
                    placeholder="John Doe"
                  />
                  <p className="text-red-500 text-xs italic">{fullNameError}</p>
                </div>
                <div className={role !== "staff" ? "hidden" : ""}>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    StaffID
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className={
                      staffIDError
                        ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    }
                    placeholder="staff1"
                    value={staffID}
                    onChange={(e) => setStaffID(e.target.value)}
                  />
                  <p className="text-red-500 text-xs italic">{staffIDError}</p>
                </div>
                <div className={role !== "student" ? "hidden" : ""}>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    RegNO
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className={
                      regNOError
                        ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    }
                    placeholder="2017/234892"
                    value={regNO}
                    onChange={(e) => setRegNO(e.target.value)}
                  />
                  <p className="text-red-500 text-xs italic">{regNOError}</p>
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
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={
                      confirmPasswordError
                        ? "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        : "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    }
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <p className="text-red-500 text-xs italic">
                    {confirmPasswordError}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full text-blue-400 bg-primary-600 hover:bg-grey-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account yet?{" "}
                  <a
                    href="/"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
