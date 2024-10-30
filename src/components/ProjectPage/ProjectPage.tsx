import React, { useEffect, useRef } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setContactsForm,
  setSelectProjects,
} from "../../redux/slices/projects.slice.ts";
import { Link, useLocation, useParams } from "react-router-dom";
import "./ProjectPage.scss";
import { ProjectItem } from "./ProjectItem/ProjectItem.tsx";
import { RenderProjects } from "../HomePage/RenderProjects/RenderProjects.tsx";
import { SIZE__PROJECT__IMG } from "../../utils/const.ts";

export const ProjectPage: React.FC = () => {
  const { language, selectLanguage, projects, selectedProject } =
    useAppSelector(selectProjects);

  const { productId } = useParams();

  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  const slideBottomRef = useRef(null);

  useEffect(() => {
    const slideBottom = slideBottomRef.current;

    if (projects) {
      const ProjectById =
        projects.find((project) => project.id === productId) || null;
      dispatch(setSelectProjects(ProjectById));
    }

    if (slideBottom) {
      const handleScroll = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Рассчитываем 10% от высоты окна просмотра
        const tenPercentOfViewport = windowHeight * 0.3;

        // Процент прокрутки документа
        const scrollPercent =
          -(scrollTop / (documentHeight - windowHeight)) * 100;

        // Используем 10% высоты окна для проверки вместо 400 пикселей
        const slideCalc =
          scrollTop < tenPercentOfViewport ? 100 : scrollPercent + 50;

        // Применяем transform
        slideBottom.style.transform = `translateY(${slideCalc}%)`;
      };

      // Добавляем обработчик события scroll
      window.addEventListener("scroll", handleScroll);

      // Удаляем обработчик при размонтировании компонента
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [projects, productId, selectedProject]);

  const handleScrollArrowRightClick = () => {
    const scrollContainer = document.getElementById("scroll-container");

    scrollContainer!.scrollBy({ left: SIZE__PROJECT__IMG, behavior: "smooth" });
  };

  const handleScrollArrowLeftClick = () => {
    const scrollContainer = document.getElementById("scroll-container");

    scrollContainer!.scrollBy({
      left: -SIZE__PROJECT__IMG,
      behavior: "smooth",
    });
  };

  const handleContactFormButton = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    document.body.style.overflowX = "hidden";

    dispatch(setContactsForm(true));
  };

  const countPathName = pathname.split("/");

  const regex = /\d{4}-\d{2}-\d{2}/;

  if (selectedProject) {
    const visibleProjects = projects.filter(
      (project) =>
        project.category === selectedProject.category &&
        project.id !== selectedProject.id
    );

    const visibleText = !language
      ? selectedProject.description
      : selectedProject.descriptionENG;

    const visiblePath =
      countPathName.length <= 2
        ? [selectLanguage.home, selectedProject.title]
        : [
            selectLanguage.home,
            selectLanguage.headerPortfolio,
            selectedProject.title,
          ];

    return (
      <div className="ProjectPage__center">
        <div className="ProjectPage">
          <div className="ProjectPage__top">
            <img
              id="slideImg"
              src={selectedProject.mainimg}
              className="HomePage__top__img"
              alt=""
            />

            <div
              id="slide__bottom"
              ref={slideBottomRef}
              className="ProjectPage__top__bottom-slide"
            >
              <h2 className="ProjectPage__top__title">
                {selectedProject.title}
              </h2>
            </div>
          </div>

          <div className="ProjectPage__description__center">
            <div className="ProjectPage__description">
              <div className="ProjectPage__description__path">
                {visiblePath.map((path, i) => (
                  <Link
                    to={`/${countPathName[i]}`}
                    key={i}
                    className="ProjectPage__description__path__item"
                  >
                    {path}
                  </Link>
                ))}
              </div>

              <div className="ProjectPage__description__top">
                <ul className="ProjectPage__description__top__list">
                  <li className="ProjectPage__description__top__list__item">
                    {`${selectLanguage.projectName}: ${selectedProject.title}`}
                  </li>

                  <li className="ProjectPage__description__top__list__item">
                    {`${selectLanguage.projectCategory}: ${selectedProject.category}`}
                  </li>

                  <li className="ProjectPage__description__top__list__item">
                    {`${selectLanguage.projectLocation}: ${selectedProject.location}`}
                  </li>

                  <li className="ProjectPage__description__top__list__item">
                    {`${
                      selectLanguage.projectYear
                    }: ${selectedProject.createdAt.match(regex)}`}
                  </li>
                </ul>

                <button
                  onClick={() => handleContactFormButton()}
                  className="ProjectPage__description__top__button"
                >
                  {selectLanguage.buttonConversion}
                </button>
              </div>

              <p className="ProjectPage__description__text">{visibleText}</p>
            </div>
          </div>

          {selectedProject.tour && (
            <div className="ProjectPage__tour">
              <h2 className="ProjectPage__tour__title">
                {selectLanguage.tour}
              </h2>

              <iframe
                className="ProjectPage__tour__frame"
                src={selectedProject.tour}
                title="Встроенная страница"
              ></iframe>
            </div>
          )}

          <div className="ProjectPage__images__center">
            {selectedProject.images.map((img) => (
              <ProjectItem key={img} image={img} />
            ))}
          </div>

          <div className="ProjectPage__other-projects">
            <h2 className="HomePage__categorys__title__h2 margin-top margin-bottom-text-left">
              {selectLanguage.otherProject}
            </h2>

            <div className="ProjectPage__other-projects__center">
              <button
                onClick={() => handleScrollArrowLeftClick()}
                className="HomePage__categorys__projects-list__button HomePage__categorys__projects-list__button--left button__other"
              ></button>
              <RenderProjects visibleProjects={visibleProjects} />
              <button
                onClick={() => handleScrollArrowRightClick()}
                className="HomePage__categorys__projects-list__button HomePage__categorys__projects-list__button--right button__other"
              ></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
