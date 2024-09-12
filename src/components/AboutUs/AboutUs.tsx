import React from "react";
import "./AboutUs.scss";
import { TEAM } from "../../utils/const.ts";
import { MemberOfTeam } from "./MemberOfTeam/MemberOfTeam.tsx";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setContactsForm,
} from "../../redux/slices/projects.slice.ts";

export const AboutUs: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectLanguage } = useAppSelector(selectProjects);

  const handleContactFormButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.style.overflow = "hidden";

    dispatch(setContactsForm(true));
  };

  return (
    <div className="AboutUs__center">
      <section className="AboutUs">
        <div className="AboutUs__top">
          <section className="AboutUs__top__section">
            <h2 className="AboutUs__title">{selectLanguage.whoWeAre}</h2>

            <p className="AboutUs__top__text">{selectLanguage.whoWeAreText}</p>
          </section>

          <section className="AboutUs__top__section">
            <h2 className="AboutUs__title">{selectLanguage.whatWeDo}</h2>

            <ul className="AboutUs__top__section__list">
              <li className="AboutUs__top__section__list__item">
                {selectLanguage.whatWeDo1}
              </li>

              <li className="AboutUs__top__section__list__item">
                {selectLanguage.whatWeDo2}
              </li>

              <li className="AboutUs__top__section__list__item">
                {selectLanguage.whatWeDo3}
              </li>

              <li className="AboutUs__top__section__list__item">
                {selectLanguage.whatWeDo4}
              </li>

              <li className="AboutUs__top__section__list__item">
                {selectLanguage.whatWeDo5}
              </li>
            </ul>
          </section>

          <section className="AboutUs__top__img__container">
            <img className="AboutUs__top__img" src="about-img.jpg" alt="" />
          </section>

          <section className="AboutUs__top__section">
            <h2 className="AboutUs__title">{selectLanguage.joinOurBuro}</h2>

            <p className="AboutUs__top__text">
              {selectLanguage.joinOurBuroText}
            </p>
          </section>

          <div className="AboutUs__top__button__center">
            <button
              onClick={() => handleContactFormButton()}
              className="AboutUs__top__button"
            >
             {selectLanguage.buttonConversion}
            </button>
          </div>
        </div>

        <div className="AboutUs__bottom">
          <h2 className="AboutUs__title">{selectLanguage.team}</h2>

          <ul className="AboutUs__bottom__team">
            {TEAM.map((member) => (
              <MemberOfTeam
                key={member.name}
                name={member.name}
                role={member.role}
                photo={member.photo}
                uaname={member.uaname}
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
