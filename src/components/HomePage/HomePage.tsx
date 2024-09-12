import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../custom-hooks/reduxHooks.ts";
import {
  selectProjects,
  setContactsForm,
} from "../../redux/slices/projects.slice.ts";
import {
  DEBOUNCE__ANIMATION__MS,
  DEBOUNCE__SLIDE__MS,
  SIZE__PROJECT__IMG,
  SLIDER__LENGTH,
} from "../../utils/const.ts";
import { Category } from "../../types/categorys.ts";
import { RenderProjects } from "./RenderProjects/RenderProjects.tsx";
import { CategoryList } from "./CategoryList/CategoryList.tsx";

export const HomePage: React.FC = () => {
  const { projects, selectLanguage } = useAppSelector(selectProjects);
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState(Category.EXTERIOR);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const visibleProjects = projects
    .filter((project) => project.category === category)
    .slice(0, 6)
    .reverse();

  const tour3D = projects.filter(
    (project) =>
      project.title === "Kunisovska beauty salon" ||
      project.title === "Yevropeiskyi kvartal"
  );

  const firstProjectsWith3Dtour = tour3D.concat(projects.slice(7, 9));

  const images = [
    "banners/main-view0.jpg",
    "banners/main-view1.jpg",
    "banners/main-view2.jpg",
    "banners/main-view3.jpg",
    "banners/main-view4.jpg",
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="HomePage">
      <div className="HomePage__top">

        <div className="slider-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentImageIndex ? "active" : ""}`}
              style={{
                backgroundImage: `url(${image})`,
              }}
            />
          ))}
        </div>

        <div className="HomePage__top__bottom">
          <div className="HomePage__top__text">
            <h1 className="HomePage__top__title">
              {selectLanguage.HomePageTitle}
            </h1>
            <p className="HomePage__top__sub-title">
              {selectLanguage.SubHomePage}
            </p>
          </div>

          <button
            onClick={() => handleContactFormButton()}
            className="HomePage__top__button"
          >
            {selectLanguage.buttonConversion}
          </button>
        </div>

        <div className="slides__center">
          <ul className="slides">
            <ul className="slides__item">
              <button
                className={cn("slides__button", {
                  "slides__button--active": currentImageIndex === 0,
                })}
                onClick={() => setCurrentImageIndex(0)}
              ></button>
            </ul>

            <ul className="slides__item">
              <button
                className={cn("slides__button", {
                  "slides__button--active": currentImageIndex === 1,
                })}
                onClick={() => setCurrentImageIndex(1)}
              ></button>
            </ul>

            <ul className="slides__item">
              <button
                className={cn("slides__button", {
                  "slides__button--active": currentImageIndex === 2,
                })}
                onClick={() => setCurrentImageIndex(2)}
              ></button>
            </ul>

            <ul className="slides__item">
              <button
                className={cn("slides__button", {
                  "slides__button--active": currentImageIndex === 3,
                })}
                onClick={() => setCurrentImageIndex(3)}
              ></button>
            </ul>

            <ul className="slides__item">
              <button
                className={cn("slides__button", {
                  "slides__button--active": currentImageIndex === 4,
                })}
                onClick={() => setCurrentImageIndex(4)}
              ></button>
            </ul>
          </ul>
        </div>
      </div>

      <div className="HomePage__categorys__center">
        <div className="HomePage__categorys">
          <div className="HomePage__categorys__title">
            <h2 className="HomePage__categorys__title__h2">
              {selectLanguage.SelectedProjects}
            </h2>

            <Link
              className="HomePage__categorys__title__view-all"
              to={"/portfolio"}
            >
              {selectLanguage.viewAll}
            </Link>
          </div>

          <div className="HomePage__categorys__category">
            <CategoryList setCategory={setCategory} category={category} />
          </div>

          <button
            onClick={() => handleScrollArrowLeftClick()}
            className="HomePage__categorys__projects-list__button HomePage__categorys__projects-list__button--left"
          ></button>

          <RenderProjects visibleProjects={visibleProjects} />

          <button
            onClick={() => handleScrollArrowRightClick()}
            className="HomePage__categorys__projects-list__button HomePage__categorys__projects-list__button--right"
          ></button>
        </div>
      </div>

      <div className="HomePage__about-us__center">
        <div className="HomePage__about-us">
          <p className="HomePage__about-us__text">
            {selectLanguage.mainHomePage}
          </p>
        </div>
      </div>

      <div className="HomePage__portfolio__center">
        <div className="HomePage__portfolio">
          <div className="HomePage__categorys__title">
            <h2 className="HomePage__categorys__title__h2">
              {selectLanguage.headerPortfolio}
            </h2>

            <Link
              className="HomePage__categorys__title__view-all"
              to={"/portfolio"}
            >
              {selectLanguage.viewAll}
            </Link>
          </div>

          <RenderProjects
            visibleProjects={firstProjectsWith3Dtour}
            margin={true}
          />

          <RenderProjects
            visibleProjects={projects.slice(13, 18)}
            margin={true}
          />

          <div className="HomePage__portfolio__button__center">
            <button
              onClick={() => handleContactFormButton()}
              className="HomePage__portfolio__button"
            >
              {selectLanguage.buttonConversion}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
