import React from "react";
import { Category } from "../../../types/categorys.ts";
import cn from "classnames";
import { useAppSelector } from "../../../custom-hooks/reduxHooks.ts";
import { selectProjects } from "../../../redux/slices/projects.slice.ts";

interface Props {
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  category: string;
  all?: boolean;
  tour?: boolean;
}

export const CategoryList: React.FC<Props> = ({
  setCategory,
  category,
  all = false,
  tour = false,
}) => {
  const { selectLanguage } = useAppSelector(selectProjects);

  return (
    <ul className="HomePage__categorys__category__list">
      {all && (
        <li className="HomePage__categorys__category__list__item">
          <span
            onClick={() => setCategory(Category.ALL)}
            className={cn("HomePage__categorys__category__list__link", {
              "HomePage__categorys__category__list__link--active":
                category === Category.ALL,
            })}
          >
            {selectLanguage.all}
          </span>
        </li>
      )}

      <li className="HomePage__categorys__category__list__item">
        <span
          onClick={() => setCategory(Category.EXTERIOR)}
          className={cn("HomePage__categorys__category__list__link", {
            "HomePage__categorys__category__list__link--active":
              category === Category.EXTERIOR,
          })}
        >
          {selectLanguage.exterior}
        </span>
      </li>

      <li className="HomePage__categorys__category__list__item">
        <span
          onClick={() => setCategory(Category.INTERIOR)}
          className={cn("HomePage__categorys__category__list__link", {
            "HomePage__categorys__category__list__link--active":
              category === Category.INTERIOR,
          })}
        >
          {selectLanguage.interior}
        </span>
      </li>

      <li className="HomePage__categorys__category__list__item">
        <span
          onClick={() => setCategory(Category.LANDSCAPE)}
          className={cn("HomePage__categorys__category__list__link", {
            "HomePage__categorys__category__list__link--active":
              category === Category.LANDSCAPE,
          })}
        >
          {selectLanguage.landscape}
        </span>
      </li>

      {tour && (
        <li className="HomePage__categorys__category__list__item">
          <span
            onClick={() => setCategory(Category["3D"])}
            className={cn("HomePage__categorys__category__list__link", {
              "HomePage__categorys__category__list__link--active":
                category === Category["3D"],
            })}
          >
            {selectLanguage.tourCategory}
          </span>
        </li>
      )}
    </ul>
  );
};
