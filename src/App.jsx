import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages for the home pages and layout
import Homepage from "./pages/user/Home/Home";
import HomeLayout from "./components/User/layout";
import ContactPage from "./pages/user/Contact/Contact";
import AboutPage from "./pages/user/About/About";
import ResetPasswordPage from "./pages/user/ResetPassword";

// Pages for authenticated user
import AuthUserPage from "./pages/user/Auth/index";
import AuthUserLayout from "./components/User/Auth/Layout";
import AuthFiles from "./pages/user/Auth/Files";
import AuthProfile from "./pages/user/Auth/Profile";
import AuthSharedPage from "./pages/user/Auth/Shared";

// Layouts and pages for admin
import AdminLayout from "./components/Admin/Layout";
import AdminHomePage from "./pages/admin/index";
import UsersPage from "./pages/admin/Users";
import SignIn from "./pages/user/signin/signin";
import SignUp from "./pages/user/signup/signup";
import EmailAdmin from "./pages/admin/Email";
import ProfileAdmin from "./pages/admin/Profile";
import ContactAdminPages from "./pages/admin/Contact";
import NewPassword from "./pages/user/NewPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="about-us" element={<AboutPage />}></Route>
          <Route path="/contact-us" element={<ContactPage />}></Route>
        </Route>
        <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
        <Route path="/change-password/:id" element={<NewPassword />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/drive" element={<AuthUserLayout />}>
          <Route index element={<AuthUserPage />}></Route>
          <Route path="files" element={<AuthFiles />}></Route>
          <Route path="profile" element={<AuthProfile />}></Route>
          <Route path="shared-with-me" element={<AuthSharedPage />}></Route>
        </Route>
        {/* Routes for admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />}></Route>
          <Route path="users" element={<UsersPage />}></Route>
          <Route path="email" element={<EmailAdmin />}></Route>
          <Route path="profile" element={<ProfileAdmin />}></Route>
          <Route path="contacts" element={<ContactAdminPages />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
