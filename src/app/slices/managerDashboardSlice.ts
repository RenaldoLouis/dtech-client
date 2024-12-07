import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { ExpenseDetails } from "../../constants/interfaces/Expense";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface ExpenseLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface ExpenseState {
  lineChartExpenses: ExpenseDetails[];
  pieChartExpenses: ExpenseDetails[];
  reimbursementExpenses: ExpenseDetails[];
  loader: ExpenseLoaderDetails;
}

const initialState: ExpenseState = {
  lineChartExpenses: [],
  pieChartExpenses: [],
  reimbursementExpenses: [],
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const managerDashboardSlice = createSlice({
  name: "managerDashboard",
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
    setLineChartData: (
      state: ExpenseState,
      action: PayloadAction<PaginatedDataResponse<ExpenseDetails>>
    ) => {
      state.lineChartExpenses = action.payload.data;
    },
    setPieChartData: (
      state: ExpenseState,
      action: PayloadAction<PaginatedDataResponse<ExpenseDetails>>
    ) => {
      state.pieChartExpenses = action.payload.data;
    },
    setReimbursementExpenseData: (
      state: ExpenseState,
      action: PayloadAction<PaginatedDataResponse<ExpenseDetails>>
    ) => {
      state.reimbursementExpenses = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const {
  setLineChartData,
  setPieChartData,
  setReimbursementExpenseData,
} = managerDashboardSlice.actions;

export const getExpensesForManager = createAsyncThunk(
  "managerDashboard/getExpensesForManager",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseForManager(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(managerDashboardSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(
          managerDashboardSlice.actions.showError(errorMessage)
        );
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(managerDashboardSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default managerDashboardSlice.reducer;
