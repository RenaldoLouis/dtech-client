import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { EmployeeDetails } from "../../constants/interfaces/Users";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayload, ThunkPayloadWithData } from "../store";

import {
  checkResponseEmptyContent,
  checkResponseWithContent,
} from "../../utils/request";

interface EmployeeLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface EmployeeState {
  employees: EmployeeDetails[];
  loader: EmployeeLoaderDetails;
  currPage: number;
  hasNextPage: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const employeeSlice = createSlice({
  name: "employees",
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
    setEmployees: (
      state,
      action: PayloadAction<PaginatedDataResponse<EmployeeDetails>>
    ) => {
      if (state.currPage === 1) {
        state.employees = action.payload.data;
      } else {
        state.employees = [...state.employees, ...action.payload.data];
      }
      state.currPage += action.payload.next_page ? 1 : 0;
      state.hasNextPage = action.payload.next_page;
    },
    resetEmployees: (state) => {
      state.currPage = 1;
      state.hasNextPage = false;
      state.employees = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { setEmployees, resetEmployees } = employeeSlice.actions;

export const fetchUsersForOrganizationPaginated = createAsyncThunk(
  "users/fetchUsersForOrganizationPaginated",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      employeeSlice.actions.showLoader("Fetching employees list...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.employees.fetchUsersForOrganizationPaginated(
        thunkPayload
      );
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setEmployees(response?.data));
        thunkAPI.dispatch(employeeSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(employeeSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(employeeSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchAllUsersForOrganization = createAsyncThunk(
  "users/fetchAllUsersForOrganization",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      employeeSlice.actions.showLoader("Fetching employees list...")
    );
    const { onSuccess, onError } = payload;

    try {
      const response = await api.employees.fetchAllUsersForOrganization();
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setEmployees(response?.data));
        thunkAPI.dispatch(employeeSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(employeeSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(employeeSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchManagedUsersForManager = createAsyncThunk(
  "users/fetchManagedUsersForManager",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      employeeSlice.actions.showLoader("Fetching managed employees list...")
    );
    const { onSuccess, onError } = payload;

    try {
      const response = await api.employees.fetchManagedUsersForManager();
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setEmployees(response?.data));
        thunkAPI.dispatch(employeeSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(employeeSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(employeeSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const deleteUserWithIdForAdmin = createAsyncThunk(
  "users/deleteUserWithIdForAdmin",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(employeeSlice.actions.showLoader("Deleting user..."));
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.employees.deleteUserWithId(thunkPayload);

      if (checkResponseEmptyContent(response)) {
        thunkAPI.dispatch(employeeSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(employeeSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(employeeSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default employeeSlice.reducer;
