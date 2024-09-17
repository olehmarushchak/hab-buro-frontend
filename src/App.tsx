import "./App.scss";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./custom-hooks/reduxHooks.ts";
import { initProjects, selectProjects, setCarousel } from "./redux/slices/projects.slice.ts";
import { Header } from "./components/Header/Header.tsx";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer/Footer.tsx";
import { ContactsForm } from "./components/ContactsForm/ContactsForm.tsx";
import { Carousel } from "./components/Сarousel/Сarousel.tsx";
import { Sidebar } from "./components/Sidebar/Sidebar.tsx";

const App: React.FC = () => {
  const { contactsForm, carousel, selectedProject, sidebar } =
    useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(initProjects());
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    dispatch(setCarousel(false));
  }, [pathname]);

  return (
    <div className="App">
      {contactsForm && <ContactsForm />}

      {carousel && selectedProject && (
        <Carousel images={selectedProject.images} />
      )}
      
      {sidebar && <Sidebar />}
      
      <Header />

      <main className="reservedHeader">
        <Outlet />
      </main>

      <div className="Footer__container">
        <Footer />
      </div>
    </div>
  );
};

export default App;
