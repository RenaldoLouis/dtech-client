import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import api from "../../services/api";
import { ThunkPayloadWithData, ThunkPayload } from "../store";

import { checkResponseWithContent } from "../../utils/request";

// NOTE: This slice is only used for FETCHING, and then
// passing the fetched data to the onSuccess handler
interface ExportLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

interface ExportState {
  loader: ExportLoaderDetails;
}

const initialState: ExportState = {
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const exportSlice = createSlice({
  name: "export",
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
        message: action.payload ?? "",
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
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const fetchExpensesUnderManagerForExport = createAsyncThunk(
  "export/fetchExpensesUnderManagerForExport",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      exportSlice.actions.showLoader("Exporting Approval Expenses...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseForManager(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(exportSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data?.data ?? []);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(exportSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(exportSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchExpensesUnderEmployeeForExport = createAsyncThunk(
  "export/fetchExpensesUnderEmployeeForExport",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      exportSlice.actions.showLoader("Exporting Employee Expenses...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseForEmployee(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(exportSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data?.data ?? []);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(exportSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(exportSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchCategoriesForExport = createAsyncThunk(
  "export/fetchCategoriesForExport",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      exportSlice.actions.showLoader("Exporting Categories...")
    );
    const { onSuccess, onError } = payload;

    try {
      const response = await api.categories.fetchAllCategories();

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(exportSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data?.data ?? []);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(exportSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(exportSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchDepartmentsForExport = createAsyncThunk(
  "export/fetchDepartmentsForExport",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      exportSlice.actions.showLoader("Exporting Departments...")
    );
    const { onSuccess, onError } = payload;

    try {
      const response = await api.departments.fetchAllDepartments();

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(exportSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data?.data ?? []);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(exportSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(exportSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchProjectsForExport = createAsyncThunk(
  "export/fetchProjectsForExport",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(exportSlice.actions.showLoader("Exporting Projects..."));
    const { onSuccess, onError } = payload;

    try {
      const response = await api.projects.fetchAllProjects();

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(exportSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data?.data ?? []);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(exportSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(exportSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchUsersForExport = createAsyncThunk(
  "export/fetchUsersForExport",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(exportSlice.actions.showLoader("Exporting Projects..."));
    const { onSuccess, onError } = payload;

    try {
      const response = await api.employees.fetchAllUsersForOrganization();

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(exportSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data?.data ?? []);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(exportSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(exportSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default exportSlice.reducer;
