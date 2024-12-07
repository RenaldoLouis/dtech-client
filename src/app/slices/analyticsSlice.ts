import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { ExpenseDetails } from "../../constants/interfaces/Expense";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface AnalyticsLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface AnalyticsState {
  analyticExpenses: ExpenseDetails[];
  loader: AnalyticsLoaderDetails;
}

const initialState: AnalyticsState = {
  analyticExpenses: [],
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const analyticsSlice = createSlice({
  name: "analytics",
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
    setAnalyticsExpenses: (
      state,
      action: PayloadAction<PaginatedDataResponse<ExpenseDetails>>
    ) => {
      state.analyticExpenses = action.payload.data ?? [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { setAnalyticsExpenses } = analyticsSlice.actions;

export const fetchExpensesForAnalytics = createAsyncThunk(
  "category/fetchExpensesForAnalytics",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      analyticsSlice.actions.showLoader("Fetching expenses...")
    );

    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseForManager(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setAnalyticsExpenses(response?.data));
        thunkAPI.dispatch(analyticsSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(analyticsSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(analyticsSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default analyticsSlice.reducer;
