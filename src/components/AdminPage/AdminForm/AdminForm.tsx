import React, { useState } from "react";
import { Projects } from "../../../types/projects.type.ts";
import { Category } from "../../../types/categorys.ts";
import { deleteProject, updateProject } from "../../../api/project.ts";

interface Props {
  project: Projects;
  setError:  React.Dispatch<React.SetStateAction<string>>;
  setAccess:  React.Dispatch<React.SetStateAction<string>>;
}

export const AdminForm: React.FC<Props> = ({ project, setAccess, setError }) => {
  const [title, setTitle] = useState(project.title || "");
  const [mainimg, setMainimg] = useState(project.mainimg || "");
  const [description, setDescription] = useState(project.description || "");
  const [descriptionENG, setDescriptionENG] = useState(
    project.descriptionENG || ""
  );
  const [category, setCategory] = useState(project.category);
  const [location, setLocation] = useState(project.location || "");
  const [tour, setTour] = useState(project.tour || "");
  const [images, setImages] = useState(project.images || []);

  const handleSubmitFormChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id,
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
      !mainimg ||
      !description ||
      !descriptionENG ||
      !location ||
      !images
    ) {
      setError("please enter all field for submit");

      return;
    }

    const updatedProject = {
      title,
      category,
      mainimg,
      description,
      images,
      tour,
      location,
      descriptionENG,
    };

    updateProject(id, updatedProject).then(() => setAccess("updated access"));
  };

  const handleSubmitDelete = (id) => {
    deleteProject(id);
  };

  return (
    <form className="AdminPage__list__item">
      <div className="AdminPage__list__item__block">
        <label className="AdminPage__list__item__label" htmlFor="title">
          Title
        </label>

        <div className="AdminPage__list__item__inputs">
          <div className="AdminPage__list__item__inputs__block">
            <input
              id="title"
              className="AdminPage__list__item__inputs__input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
              className="AdminPage__list__item__inputs__input"
              type="text"
              value={mainimg}
              onChange={(event) => setMainimg(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="AdminPage__list__item__block">
        <label className="AdminPage__list__item__label" htmlFor="description">
          Description
        </label>

        <div className="AdminPage__list__item__inputs">
          <div className="AdminPage__list__item__inputs__block">
            <textarea
              id="description"
              className="AdminPage__list__item__inputs__textarea"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
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
              className="AdminPage__list__item__inputs__textarea"
              value={descriptionENG}
              onChange={(event) => setDescriptionENG(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="AdminPage__list__item__block">
        <label className="AdminPage__list__item__label" htmlFor="location">
          Location
        </label>

        <div className="AdminPage__list__item__inputs">
          <div className="AdminPage__list__item__inputs__block">
            <input
              id="location"
              className="AdminPage__list__item__inputs__input"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="AdminPage__list__item__block">
        <label className="AdminPage__list__item__label" htmlFor="location">
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
        <label className="AdminPage__list__item__label" htmlFor="tour">
          3D tour
        </label>

        <div className="AdminPage__list__item__inputs">
          <div className="AdminPage__list__item__inputs__block">
            <input
              id="tour"
              className="AdminPage__list__item__inputs__input"
              type="text"
              value={tour}
              onChange={(event) => setTour(event.target.value)}
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
            {images.map((img) => (
              <input
                id="images"
                className="AdminPage__list__item__inputs__input"
                type="text"
                value={img || ""}
                onChange={(event) =>
                  setImages((currentImages) => [
                    ...currentImages,
                    event.target.value,
                  ])
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="AdminPage__buttons">
        <button
          type="submit"
          onClick={(event) =>
            handleSubmitFormChange(
              event,
              project.id,
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
        >
          Save changes
        </button>

        <button
          type="submit"
          onClick={(event) => handleSubmitDelete(project.id)}
        >
          Delete projects
        </button>
      </div>
    </form>
  );
};
