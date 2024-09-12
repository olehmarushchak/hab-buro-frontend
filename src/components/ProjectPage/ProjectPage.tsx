import React, { useEffect } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setContactsForm,
  setSelectProjects,
} from "../../redux/slices/projects.slice.ts";
import { useParams } from "react-router-dom";
import "./ProjectPage.scss";
import { ProjectItem } from "./ProjectItem/ProjectItem.tsx";
import { RenderProjects } from "../HomePage/RenderProjects/RenderProjects.tsx";
import { SIZE__PROJECT__IMG } from "../../utils/const.ts";

export const ProjectPage: React.FC = () => {
  const { language, selectLanguage, projects, selectedProject } =
    useAppSelector(selectProjects);

  const { productId } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(selectedProject);

    if (projects) {
      const ProjectById =
        projects.find((project) => project.id === productId) || null;

      dispatch(setSelectProjects(ProjectById));
    }
  }, [projects, productId]);

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
    document.body.style.overflow = "hidden";

    dispatch(setContactsForm(true));
  };

  if (selectedProject) {
    const visibleProjects = projects.filter(
      (project) =>
        project.category === selectedProject.category &&
        project.id !== selectedProject.id
    );

    const visibleText = !language
      ? selectedProject.description
      : selectedProject.descriptionENG;

    return (
      <div className="ProjectPage__center">
        <div className="ProjectPage">
          <div className="ProjectPage__top">
            <h2 className="ProjectPage__top__title">{selectedProject.title}</h2>

            <img
              id="slideImg"
              src={selectedProject.mainimg}
              className="HomePage__top__img"
              alt=""
            />
          </div>

          <div className="ProjectPage__description__center">
            <div className="ProjectPage__description">
              <div className="ProjectPage__description__top">
                <ul className="ProjectPage__description__top__list">
                  <li className="ProjectPage__description__top__list__item">
                    {`Project: ${selectedProject.category}`}
                  </li>

                  <li className="ProjectPage__description__top__list__item">
                    {`Location: ${selectedProject.location}`}
                  </li>

                  <li className="ProjectPage__description__top__list__item">
                    {`Year of the projec: ${selectedProject.createdAt}`}
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
              <ProjectItem key={img} images={img} />
            ))}
          </div>

          <h2 className="HomePage__categorys__title__h2">
            {selectLanguage.otherProject}
          </h2>

          <div className="ProjectPage__other-projects">
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
    );
  }
};
