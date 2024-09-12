import { Projects } from "../types/projects.type.ts";
import { client } from "../utils/client.ts";

export const getAllProject = () => {
  return client.get<Projects[]>("/projects");
};

export const updateProject = (id, updatedProject) => {
  return client.patch<Projects>(`/projects/${id}`, updatedProject);
};

export const createProject = (newProject) => {
  return client.post<Projects[]>("/projects", newProject);
};

export const deleteProject = (id) => {
  return client.delete(`/projects/${id}`);
};
