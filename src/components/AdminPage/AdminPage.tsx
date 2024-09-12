import React, { useState } from "react";
import "./AdminPage.scss";
import { useAppSelector } from "../../custom-hooks/reduxHooks.ts";
import { selectProjects } from "../../redux/slices/projects.slice.ts";
import { AdminForm } from "./AdminForm/AdminForm.tsx";
import { Category } from "../../types/categorys.ts";
import { createProject } from "../../api/project.ts";
import { AdminMessage } from "./AdminMessage/AdminMessage.tsx";

export const AdminPage: React.FC = () => {
  const { projects } = useAppSelector(selectProjects);
  const [search, setSearch] = useState("");
  const [add, setAdd] = useState(false);

  const [accessUpdateOrAdd, setAccessUpdateOrAdd] = useState("");
  const [errorUpdateOrAdd, setErrorUpdateOrAdd] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category | string>(
    Category.EXTERIOR
  );
  const [mainimg, setMainimg] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [location, setLocation] = useState("");
  const [tour, setTour] = useState("");
  const [descriptionENG, setDescriptionENG] = useState("");

  const visibleProjects = projects.filter((project) =>
    project.title.toUpperCase().includes(search.toUpperCase())
  );

  const reset = () => {
    setTitle("");
    setCategory(Category.EXTERIOR);
    setMainimg("");
    setDescription("");
    setImages("");
    setLocation("");
    setTour("");
    setDescriptionENG("");
  };

  const handleSubmitCreate = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title,
    category,
    mainimg,
    description,
    images,
    location,
    tour,
    descriptionENG
  ) => {
    event.preventDefault();

    if (
      !title ||
      !category ||
      !mainimg ||
      !description ||
      !images ||
      !location ||
      !descriptionENG
    ) {
      setErrorUpdateOrAdd("error: Not fill all field");

      return;
    }

    const newProject = {
      title,
      category,
      mainimg,
      description,
      images: images.split(","),
      location,
      tour: !tour ? null : tour,
      descriptionENG,
    };

    createProject(newProject);

    setAccessUpdateOrAdd("Access Add");
    reset();
    setAdd(false);
  };

  return (
    <div className="AdminPage__center">
      <div className="AdminPage">
        <button onClick={() => setAdd(!add)}>Add project</button>

        {accessUpdateOrAdd && (
          <AdminMessage
            status={accessUpdateOrAdd}
            setUpdate={setAccessUpdateOrAdd}
          />
        )}

        {errorUpdateOrAdd && (
          <AdminMessage
            status={errorUpdateOrAdd}
            setUpdate={setErrorUpdateOrAdd}
          />
        )}

        {add && (
          <form className="AdminPage__list__item">
            <div className="AdminPage__list__item__block">
              <label className="AdminPage__list__item__label" htmlFor="title">
                Title
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <input
                    id="title"
                    onChange={(event) => setTitle(event.target.value)}
                    className="AdminPage__list__item__inputs__input"
                    type="text"
                    value={title}
                  />
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label className="AdminPage__list__item__label" htmlFor="mainimg">
                Main img
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <input
                    id="mainimg"
                    onChange={(event) => setMainimg(event.target.value)}
                    className="AdminPage__list__item__inputs__input"
                    type="text"
                    value={mainimg}
                  />
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label
                className="AdminPage__list__item__label"
                htmlFor="location"
              >
                Category
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <select
                    onChange={(event) => setCategory(event.target.value)}
                    name="category"
                    id="category"
                    value={category}
                  >
                    <option value={Category.INTERIOR}>Interior</option>
                    <option value={Category.EXTERIOR}>Exterior</option>
                    <option value={Category.LANDSCAPE}>Landscape</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label
                className="AdminPage__list__item__label"
                htmlFor="description"
              >
                Description
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <textarea
                    id="description"
                    onChange={(event) => setDescription(event.target.value)}
                    className="AdminPage__list__item__inputs__textarea"
                    value={description}
                  />
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label
                className="AdminPage__list__item__label"
                htmlFor="descriptionENG"
              >
                DescriptionENG
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <textarea
                    id="descriptionENG"
                    onChange={(event) => setDescriptionENG(event.target.value)}
                    className="AdminPage__list__item__inputs__input"
                    value={descriptionENG}
                  />
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label
                className="AdminPage__list__item__label"
                htmlFor="location"
              >
                Location
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <input
                    id="location"
                    className="AdminPage__list__item__inputs__input"
                    type="text"
                    onChange={(event) => setLocation(event.target.value)}
                    value={location}
                  />
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label className="AdminPage__list__item__label" htmlFor="tour">
                3D tour
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <input
                    id="tour"
                    onChange={(event) => setTour(event.target.value)}
                    className="AdminPage__list__item__inputs__input"
                    type="text"
                    value={tour}
                  />
                </div>
              </div>
            </div>

            <div className="AdminPage__list__item__block">
              <label className="AdminPage__list__item__label" htmlFor="images">
                Images
              </label>

              <div className="AdminPage__list__item__inputs">
                <div className="AdminPage__list__item__inputs__block">
                  <input
                    id="images"
                    onChange={(event) => setImages(event.target.value)}
                    className="AdminPage__list__item__inputs__input"
                    type="text"
                    value={images}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={(event) =>
                handleSubmitCreate(
                  event,
                  title,
                  category,
                  mainimg,
                  description,
                  images,
                  location,
                  tour,
                  descriptionENG
                )
              }
              type="submit"
            >
              Add projects
            </button>
          </form>
        )}

        <div className="AdminPage__search">
          <label htmlFor="search">Search</label>

          <input
            onChange={(event) => setSearch(event.target.value)}
            id="search"
            type="text"
          />
        </div>

        <div className="AdminPage__list">
          {visibleProjects.map((project) => (
            <AdminForm
              key={project.id}
              project={project}
              setAccess={setAccessUpdateOrAdd}
              setError={setErrorUpdateOrAdd}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
