import React, { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.scss";
import cn from "classnames";
import { Pathname } from "../../types/pathname.ts";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setLanguage,
  setSelectLanguage,
} from "../../redux/slices/projects.slice.ts";
import { LANGUAGE } from "../../utils/language.ts";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { selectLanguage, language } = useAppSelector(selectProjects);

  const handleUA = () => {
    dispatch(setLanguage(LANGUAGE.ua));
    dispatch(setSelectLanguage(false));
  };

  const handleEU = () => {
    dispatch(setLanguage(LANGUAGE.eu));
    dispatch(setSelectLanguage(true));
  };

  useEffect(() => {
    const header = document.getElementById("Header");
    let lastScrollTop = 0; // Сохраняем последнее положение прокрутки
  
    if (header) {
      // Проверяем текущее положение прокрутки при загрузке страницы
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
  
      window.addEventListener("scroll", function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Текущее положение прокрутки
  
        if (scrollTop > lastScrollTop) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
  
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      });
    }
  }, []);

  return (
    <header id="Header" className="Header">
      <NavLink
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        className="Header__logo"
        to={"/"}
      ></NavLink>

      <ul className="Header__list phone-media">
        <li className="Header__list__item">
          <NavLink
            className={cn("Header__list__link", {
              "Header__list__link--active": pathname.includes(
                Pathname.PORTFOLIO
              ),
            })}
            to={"portfolio"}
          >
            {selectLanguage.headerPortfolio}
          </NavLink>
        </li>

        <li className="Header__list__item">
          <NavLink
            className={cn("Header__list__link", {
              "Header__list__link--active": pathname.includes(
                Pathname["ABOUT-US"]
              ),
            })}
            to={"about-us"}
          >
            {selectLanguage.headerAboutUs}
          </NavLink>
        </li>

        <li className="Header__list__item">
          <NavLink
            className={cn("Header__list__link", {
              "Header__list__link--active": pathname.includes(
                Pathname.CONTACTS
              ),
            })}
            to={"contacts"}
          >
            {selectLanguage.headerContacts}
          </NavLink>
        </li>
      </ul>

      <div className="Header__language phone-media">
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
    </header>
  );
};
