import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";

/**
 * import Layouts
 */
import MainLayout from "../containers/Layouts/MainLayout";
import AuthLayout from "../containers/Layouts/AuthLayout";
// import UserLayout from "../containers/Layouts/UserLayout";

import AdminProtected from "../components/AdminProtected";
import Protected from "../components/Protected";
import StudentProtected from "../components/StudentProtected";
import LecturerProtected from "../components/LecturerProtected";
/**
 * import views
 */
import Login from "../containers/Views/Login";
import Signup from "../containers/Views/Signup";
import Admin from "../containers/Views/Admin";
import Student from "../containers/Views/Students";
import Supervisor from "../containers/Views/Supervisors";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route
          element={
            <Protected>
              <MainLayout />
            </Protected>
          }
        >
          <Route
            path="/dashboard/admin"
            element={
              <AdminProtected>
                <Admin />
              </AdminProtected>
            }
          />
          <Route
            path="/dashboard/student"
            element={
              <StudentProtected>
                <Student />
              </StudentProtected>
            }
          />
          <Route
            path="/dashboard/lecturer"
            element={
              <LecturerProtected>
                <Supervisor />
              </LecturerProtected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
