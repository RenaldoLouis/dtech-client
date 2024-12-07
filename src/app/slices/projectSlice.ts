import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { ProjectDetails } from "../../constants/interfaces/Project";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface ProjectLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface ProjectState {
  projects: ProjectDetails[];
  edit_id: string;
  loader: ProjectLoaderDetails;
  currPage: number;
  hasNextPage: boolean;
}

const initialState: ProjectState = {
  projects: [],
  edit_id: "",
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<string>) => {
      state.loader = {
        loading: true,
        message: action.payload,
        error: undefined,
      };
    },
    showError: (state, action: PayloadAction<string>) => {
      state.loader = {
        loading: false,
        message: "",
        error: action.payload,
      };
    },
    hideLoader: (state) => {
      state.loader = {
        loading: false,
        message: "",
        error: undefined,
      };
    },
    setProjects: (
      state,
      action: PayloadAction<PaginatedDataResponse<ProjectDetails>>
    ) => {
      if (state.currPage === 1) {
        state.projects = action.payload.data;
      } else {
        state.projects = [...state.projects, ...action.payload.data];
      }

      state.currPage += action.payload.next_page ? 1 : 0;
      state.hasNextPage = action.payload.next_page;
    },
    changeEditId: (state, action: PayloadAction<string>) => {
      state.edit_id = action.payload;
    },
    resetProject: (state) => {
      state.currPage = 1;
      state.hasNextPage = false;
      state.projects = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { changeEditId, setProjects, resetProject } = projectSlice.actions;

export const fetchProjectsForOrganization = createAsyncThunk(
  "projects/fetchProjectsForOrganization",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(projectSlice.actions.showLoader("Fetching projects..."));

    const { data: thunkPayload, onSuccess, onError } = payload;
    try {
      const response = await api.projects.fetchProjects(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setProjects(response?.data));
        thunkAPI.dispatch(projectSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(projectSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(projectSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitCreateProjectAPI = createAsyncThunk(
  "projects/hitCreateProjectAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    const { data: thunkPayload, onSuccess, onError } = payload;
    thunkAPI.dispatch(projectSlice.actions.showLoader("Creating project"));
    try {
      const response = await api.projects.createProject(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(projectSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(projectSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(projectSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitEditProjectAPI = createAsyncThunk(
  "departments/hitEditProjectAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    const {
      data: [edit_id, thunkPayload],
      onSuccess,
      onError,
    } = payload;
    thunkAPI.dispatch(projectSlice.actions.showLoader("Updating project..."));
    try {
      const response = await api.projects.editProjects(edit_id, thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(projectSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(projectSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(projectSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default projectSlice.reducer;
