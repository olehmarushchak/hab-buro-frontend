import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setLanguage,
  setSelectLanguage,
  setSidebar,
} from "../../redux/slices/projects.slice.ts";
import { NavLink, useLocation } from "react-router-dom";
import { LANGUAGE } from "../../utils/language.ts";
import cn from "classnames";
import "./Sidebar.scss";
import { Pathname } from "../../types/pathname.ts";

export const Sidebar: React.FC = () => {
  const { selectLanguage, language } = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const handleUA = () => {
    dispatch(setLanguage(LANGUAGE.ua));
    dispatch(setSelectLanguage(false));
  };

  const handleEU = () => {
    dispatch(setLanguage(LANGUAGE.eu));
    dispatch(setSelectLanguage(true));
  };

  const handleCloseClick = () => {
    dispatch(setSidebar(false));

    document.body.style.overflow = "auto";
  };

  return (
    <div className="Sidebar__center">
      <div className="Sidebar">
        <div className="Sidebar__header">
          <NavLink
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              handleCloseClick();
            }}
            className="Header__logo"
            to={"/"}
          ></NavLink>

          <div className="Sidebar__menu">
            <link
              onClick={() => handleCloseClick()}
              className="Sidebar__menu__close"
            />
          </div>
        </div>

        <ul className="Sidebar__list">
          <li className="Sidebar__list__item">
            <NavLink
              to={"portfolio"}
              className={cn("Sidebar__list__link", {
                "Sidebar__list__link--active": pathname.includes(
                  Pathname.PORTFOLIO
                ),
              })}
              onClick={() => handleCloseClick()}
            >
              {selectLanguage.headerPortfolio}
            </NavLink>
          </li>

          <li className="Sidebar__list__item">
            <NavLink
              to={"about-us"}
              className={cn("Sidebar__list__link", {
                "Sidebar__list__link--active": pathname.includes(
                  Pathname["ABOUT-US"]
                ),
              })}
              onClick={() => handleCloseClick()}
            >
              {selectLanguage.headerAboutUs}
            </NavLink>
          </li>

          <li className="Sidebar__list__item">
            <NavLink
              to={"contacts"}
              className={cn("Sidebar__list__link", {
                "Sidebar__list__link--active": pathname.includes(
                  Pathname.CONTACTS
                ),
              })}
              onClick={() => handleCloseClick()}
            >
              {selectLanguage.headerContacts}
            </NavLink>
          </li>

          <li>
            <div className="Header__language ">
              <button
                onClick={() => handleUA()}
                className={cn("Header__language__link", {
                  "Header__language__link--active": !language,
                })}
              >
                {selectLanguage.UA}
              </button>

              <button
                onClick={() => handleEU()}
                className={cn("Header__language__link", {
                  "Header__language__link--active": language,
                })}
              >
                {selectLanguage.EU}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
