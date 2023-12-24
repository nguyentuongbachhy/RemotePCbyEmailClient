import React from "react";
import { Route, Routes } from "react-router-dom";
import { About, Activate, Contact, ForbiddenPage, ForgetPassword, Home, Login, NoPage, PublicPage, SignUp } from "./pages/public";
import paths from "./utils/paths";


function App() {
  return (
    <div className="">
      <Routes>
        <Route path={paths.PUBLIC_PAGE} element={<PublicPage />}>
          <Route index element={<Home />} />
          <Route path={paths.LOGIN_PAGE} element={<Login />} />
          <Route path={paths.FORGET_PAGE} element={<ForgetPassword />} />
          <Route path={paths.SIGNUP_PAGE} element={<SignUp />} />
          <Route path={paths.ABOUT_PAGE} element={<About />} />
          <Route path={paths.CONTACT_PAGE} element={<Contact />} />
        </Route>
        <Route path={paths.ACTIVATE_PAGE} element={<Activate />} />
        <Route path={paths.RESET_PASSWORD_PAGE} element={<Activate />} />
        <Route path={paths.FORBIDDEN_PAGE} element={<ForbiddenPage />} />
        <Route path={paths.STAR} element={<NoPage />} />
      </Routes>
    </div>
  );
}

export default App;
