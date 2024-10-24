import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Projects } from "../../../../types/projects.type.ts";
import cn from "classnames";

interface Props {
  project: Projects;
  marginZero?: boolean;
}

export const ProjectItem: React.FC<Props> = ({
  project,
  marginZero = false,
}) => {
  const { pathname } = useLocation();
  const { productId } = useParams();

  const linkNewProduct = (p: string, idItem: string) => {
    if (productId && p.includes(productId)) {
      return p.replace(productId, project.id);
    }

    return idItem;
  };

  return (
    <Link
      className={cn("HomePage__categorys__projects-list__project", {
        margin__zero: marginZero,
      })}
      to={linkNewProduct(pathname, project.id)}
    >
      <li>
        <div className="HomePage__categorys__projects-list__img__container">
          <img
            className="HomePage__categorys__projects-list__img"
            src={project.mainimg}
            alt="img"
          />
        </div>

        <h3 className="HomePage__categorys__projects-list__title">
          {project.title}
        </h3>
      </li>
    </Link>
  );
};
