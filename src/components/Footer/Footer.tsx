import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import { useAppSelector } from "../../custom-hooks/reduxHooks.ts";
import { selectProjects } from "../../redux/slices/projects.slice.ts";

export const Footer: React.FC = () => {
  const { selectLanguage } = useAppSelector(selectProjects);

  return (
    <footer className="Footer phone-media-footer">
      <div className="gif__background"></div>

      <div className="Footer__address__container">
        <a
          href="https://www.google.com/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0,+12+%D0%B1,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D1%86%D1%96,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D0%B5%D1%86%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0,+58000/@48.2673259,25.9166579,17z/data=!4m6!3m5!1s0x47340febb993ef85:0x756998ea721bf27b!8m2!3d48.2670555!4d25.9177442!16s%2Fg%2F11y3lx8ghw?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D"
          className="Footer__address"
        >
          {selectLanguage.address}
        </a>
      </div>

      <div className="Footer__list__container">
        <ul className="Footer__list phone-media-footer__list">
          <li className="Footer__list__item">
            <Link
              className="Footer__list__link Footer__list__link--facebook"
              to={"/"}
            >
              facebook
            </Link>
          </li>
          <li className="Footer__list__item">
            <Link
              className="Footer__list__link Footer__list__link--instagram"
              to={"/"}
            >
              instagram
            </Link>
          </li>
          <li className="Footer__list__item">
            <Link
              className="Footer__list__link Footer__list__link--linkedin"
              to={"/"}
            >
              career
            </Link>
          </li>
        </ul>
      </div>

      <div className="Footer__log-in__center">
        <div className="Footer__log-in">
          <Link className="Footer__log-in__link" to={"/admin"}>
            log in
          </Link>
        </div>
      </div>
    </footer>
  );
};
