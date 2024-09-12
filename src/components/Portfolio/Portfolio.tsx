import React, { useState } from "react";
import { CategoryList } from "../HomePage/CategoryList/CategoryList.tsx";
import { Category } from "../../types/categorys.ts";
import { useAppSelector } from "../../custom-hooks/reduxHooks.ts";
import { selectProjects } from "../../redux/slices/projects.slice.ts";
import "./Portfolio.scss";
import { ProjectItem } from "../HomePage/RenderProjects/ProjectItem/ProjectItem.tsx";
import { PreloadStyleForTale } from "../HomePage/PeloadStyleForTale/PreloadStyleForTale.tsx";

export const Portfolio: React.FC = () => {
  const { projects, selectLanguage } = useAppSelector(selectProjects);

  const [category, setCategory] = useState(Category.ALL);

  const with3Dtour = projects.filter((project) => project.tour);

  const visibleCategory =
    Category.ALL === category
      ? projects
      : projects.filter((project) => project.category === category);

  const visibleProjects =
    category === Category["3D"] ? with3Dtour : visibleCategory;

  return (
    <div className="Portfolio__center">
      <section className="Portfolio">
        <h2 className="Portfolio__title">{selectLanguage.headerPortfolio}</h2>

        <div className="Portfolio__categorys">
          <CategoryList
            setCategory={setCategory}
            category={category}
            all={true}
            tour={true}
          />
        </div>

        <div className="Portfolio__projects">
          {!visibleProjects.length &&
            [1, 2, 3, 4, 5, 6].map((element) => (
              <PreloadStyleForTale key={element} />
            ))}

          {visibleProjects.map((project) => (
            <ProjectItem key={project.id} project={project} marginZero={true} />
          ))}
        </div>
      </section>
    </div>
  );
};
