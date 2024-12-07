import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { DepartmentDetails } from "../../constants/interfaces/Department";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface DepartmentLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface DepartmentState {
  departments: DepartmentDetails[];
  edit_id: string;
  loader: DepartmentLoaderDetails;
  currPage: number;
  hasNextPage: boolean;
}

const initialState: DepartmentState = {
  departments: [],
  edit_id: "",
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const departmentSlice = createSlice({
  name: "departments",
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
    setDepartments: (
      state,
      action: PayloadAction<PaginatedDataResponse<DepartmentDetails>>
    ) => {
      if (state.currPage === 1) {
        state.departments = action.payload.data;
      } else {
        state.departments = [...state.departments, ...action.payload.data];
      }

      state.currPage += action.payload.next_page ? 1 : 0;
      state.hasNextPage = action.payload.next_page;
    },
    changeEditId: (state, action: PayloadAction<string>) => {
      state.edit_id = action.payload;
    },
    resetDepartments: (state) => {
      state.currPage = 1;
      state.hasNextPage = false;
      state.departments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { changeEditId, setDepartments, resetDepartments } =
  departmentSlice.actions;

export const fetchDepartmentsForOrganizationPaginated = createAsyncThunk(
  "departments/fetchDepartmentsForOrganizationPaginated",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      departmentSlice.actions.showLoader("Fetching departments...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.departments.fetchDepartment(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setDepartments(response?.data));
        thunkAPI.dispatch(departmentSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(departmentSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(departmentSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitCreateDepartmentAPI = createAsyncThunk(
  "departments/hitCreateDepartmentAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      departmentSlice.actions.showLoader("Creating department...")
    );

    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.departments.createDepartment(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(departmentSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(departmentSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(departmentSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitEditDepartmentAPI = createAsyncThunk(
  "departments/hitEditDepartmentAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(departmentSlice.actions.showLoader("Editing department"));

    const {
      data: [edit_id, thunkPayload],
      onSuccess,
      onError,
    } = payload;
    try {
      const response = await api.departments.editDepartment(
        edit_id,
        thunkPayload
      );
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(departmentSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(departmentSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(departmentSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default departmentSlice.reducer;
