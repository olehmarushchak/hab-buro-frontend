import React from "react";
import { PreloadStyleForTale } from "../PeloadStyleForTale/PreloadStyleForTale.tsx";
import { Projects } from "../../../types/projects.type";
import cn from "classnames";
import { ProjectItem } from "./ProjectItem/ProjectItem.tsx";

interface Props {
  visibleProjects: Projects[];
  margin?: boolean;
}

export const RenderProjects: React.FC<Props> = ({
  visibleProjects,
  margin,
}) => {
  return (
    <ul
      id="scroll-container"
      className={cn("HomePage__categorys__projects-list", {
        "margin-bottom": margin,
      })}
    >
      {!visibleProjects.length &&
        [1, 2, 3, 4, 5].map((element) => <PreloadStyleForTale key={element} />)}

      {visibleProjects.map((project) => (
        <ProjectItem project={project} key={project.id} />
      ))}
    </ul>
  );
};
