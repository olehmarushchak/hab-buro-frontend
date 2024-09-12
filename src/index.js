import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage/HomePage.tsx";
import { Portfolio } from "./components/Portfolio/Portfolio.tsx";
import { AboutUs } from "./components/AboutUs/AboutUs.tsx";
import { Contacts } from "./components/Contacts/Contacts.tsx";
import { ProjectPage } from "./components/ProjectPage/ProjectPage.tsx";
import { LoginPage } from "./components/LoginPage/LoginPage.tsx";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.tsx";
import { AdminPage } from "./components/AdminPage/AdminPage.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="login" element={<LoginPage />} />

          <Route
            path="admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />

          <Route path="/:productId" element={<ProjectPage />} />

          <Route path="portfolio/:productId" element={<ProjectPage />} />

          <Route path="portfolio" element={<Portfolio />} />

          <Route path="about-us" element={<AboutUs />} />

          <Route path="about-us/:productId" element={<ProjectPage />} />

          <Route path="contacts" element={<Contacts />} />

          <Route path="contacts/:productId" element={<ProjectPage />} />
        </Route>
      </Routes>
    </Provider>
  </Router>
);
