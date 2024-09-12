import React from "react";
import "./Contacts.scss";
import { useAppSelector } from "../../custom-hooks/reduxHooks.ts";
import { selectProjects } from "../../redux/slices/projects.slice.ts";

export const Contacts: React.FC = () => {
  const { selectLanguage } = useAppSelector(selectProjects);
  return (
    <div className="Contacts__center">
      <section className="Contacts">
        <h2 className="Contacts__title">{selectLanguage.contacts}</h2>

        <div className="Contacts__sections">
          <div className="Contacts__section">
            <p className="Contacts__section__info">{selectLanguage.visitUs}</p>
            <h3 className="Contacts__section__title">
              {selectLanguage.contactAddress}
            </h3>

            <ul className="Contacts__section__list">
              <li className="Contacts__section__list__item">
                <a
                  className="Contacts__section__list__link"
                  href="https://www.google.com/maps/place/%D0%B2%D1%83%D0%BB%D0%B8%D1%86%D1%8F+%D0%A0%D1%96%D0%B2%D0%BD%D0%B5%D0%BD%D1%81%D1%8C%D0%BA%D0%B0,+12+%D0%B1,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D1%86%D1%96,+%D0%A7%D0%B5%D1%80%D0%BD%D1%96%D0%B2%D0%B5%D1%86%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0,+58000/@48.2673259,25.9166579,17z/data=!4m6!3m5!1s0x47340febb993ef85:0x756998ea721bf27b!8m2!3d48.2670555!4d25.9177442!16s%2Fg%2F11y3lx8ghw?entry=ttu&g_ep=EgoyMDI0MDgyOC4wIKXMDSoASAFQAw%3D%3D"
                >
                  {selectLanguage.address}
                </a>
              </li>
            </ul>
          </div>

          <div className="Contacts__section">
            <p className="Contacts__section__info">{selectLanguage.callUs}</p>
            <h3 className="Contacts__section__title">
              {selectLanguage.contactPhone}
            </h3>

            <ul className="Contacts__section__list">
              <li className="Contacts__section__list__item">
                <a
                  className="Contacts__section__list__link"
                  href="callto:+3809351932"
                >
                  +380 50 74 48 470
                </a>
              </li>
            </ul>
          </div>

          <div className="Contacts__section">
            <p className="Contacts__section__info">{selectLanguage.writeUs}</p>
            <h3 className="Contacts__section__title">
              {selectLanguage.contactEmail}
            </h3>

            <ul className="Contacts__section__list">
              <li className="Contacts__section__list__item">
                <a
                  className="Contacts__section__list__link"
                  href="mailto:hab_buro134@gmail.com"
                >
                  hab_buro134@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
