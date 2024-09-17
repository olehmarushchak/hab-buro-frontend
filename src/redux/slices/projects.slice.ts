/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import { Projects } from "../../types/projects.type.ts";
import { getAllProject } from "../../api/project.ts";
import { LANGUAGE } from "../../utils/language.ts";
import { Language } from "../../types/language.type.ts";

export interface projectsState {
  loaded: boolean;
  projects: Projects[];
  selectedProject: Projects | false;
  carousel: boolean;
  contactsForm: boolean;
  selectLanguage: Language;
  language: boolean;
  clickedImg: string;
  sidebar: boolean;
}

const initialState: projectsState = {
  loaded: false,
  projects: [],
  selectedProject: false,
  contactsForm: false,
  selectLanguage: LANGUAGE.ua,
  language: false,
  carousel: false,
  clickedImg: "",
  sidebar: false,
};

export const initProjects = createAsyncThunk("projects/FETCH", () =>
  getAllProject()
);

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, actions) => {
      state.projects = actions.payload;
    },
    setContactsForm: (state, actions) => {
      state.contactsForm = !state.contactsForm;
    },
    setSelectProjects: (state, actions) => {
      state.selectedProject = actions.payload;
    },
    setLanguage: (state, actions) => {
      state.selectLanguage = actions.payload;
    },
    setSelectLanguage: (state, actions) => {
      state.language = actions.payload;
    },
    setCarousel: (state, actions) => {
      state.carousel = actions.payload;
    },
    setClickedImg: (state, actions) => {
      state.clickedImg = actions.payload;
    },
    setSidebar: (state, actions) => {
      state.sidebar = actions.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(initProjects.pending, (state) => {
      state.loaded = true;
    });
    builder.addCase(initProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.loaded = false;
    });
    builder.addCase(initProjects.rejected, (state) => {
      state.loaded = false;
    });
  },
});

export const {
  setProjects,
  setContactsForm,
  setSelectProjects,
  setLanguage,
  setSelectLanguage,
  setCarousel,
  setClickedImg,
  setSidebar,
} = projectsSlice.actions;

export const selectProjects = (state: RootState) => state.projects;

export default projectsSlice.reducer;
