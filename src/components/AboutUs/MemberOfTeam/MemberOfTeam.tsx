import React from "react";
import { useAppSelector } from "../../../custom-hooks/reduxHooks.ts";
import { selectProjects } from "../../../redux/slices/projects.slice.ts";

interface Props {
  uaname: string;
  name: string;
  photo: string;
  role: string;
  roleUK: string;
}

export const MemberOfTeam: React.FC<Props> = ({
  uaname,
  name,
  photo,
  role,
  roleUK,
}) => {
  const { language } = useAppSelector(selectProjects);

  const nameInText = language ? name : uaname;
  const roleText = language ? role : roleUK; 

  return (
    <li className="AboutUs__bottom__team__member">
      <img
        className="AboutUs__bottom__team__member__photo"
        src={photo}
        alt=""
      />

      <div className="AboutUs__bottom__team__member__info">
        <h3 className="AboutUs__bottom__team__member__info__name">
          {nameInText}
        </h3>

        <p className="AboutUs__bottom__team__member__info__role">{roleText}</p>
      </div>
    </li>
  );
};
