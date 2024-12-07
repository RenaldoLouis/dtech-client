import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayloadWithData } from "../store";

import { ExpenseDetails } from "../../constants/interfaces/Expense";

import { checkResponseWithContent } from "../../utils/request";

// NOTE: This will be used for manager/admin side of expenses

interface ApprovalLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface ApprovalState {
  pendingExpenses: ExpenseDetails[];
  currPage: number;
  hasNextPage: boolean;
  loader: ApprovalLoaderDetails;
}

const initialState: ApprovalState = {
  pendingExpenses: [],
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const approvalSlice = createSlice({
  name: "approval",
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
    resetPendingExpenses: (state: ApprovalState) => {
      state.pendingExpenses = [];
      state.currPage = 1;
      state.hasNextPage = false;
    },
    setPendingExpenses: (
      state: ApprovalState,
      action: PayloadAction<PaginatedDataResponse<ExpenseDetails>>
    ) => {
      if (state.currPage === 1) {
        state.pendingExpenses = action.payload.data;
      } else {
        state.pendingExpenses = [
          ...state.pendingExpenses,
          ...action.payload.data,
        ];
      }

      state.currPage += 1;
      state.hasNextPage = action.payload.next_page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { resetPendingExpenses, setPendingExpenses } =
  approvalSlice.actions;

export const getExpensesForManager = createAsyncThunk(
  "approval/getExpensesForManager",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(approvalSlice.actions.showLoader("Fetching expenses..."));
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseForManager(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(
          approvalSlice.actions.setPendingExpenses(response?.data)
        );
        thunkAPI.dispatch(approvalSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(approvalSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(approvalSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const managerApproveExpenses = createAsyncThunk(
  "approval/managerApproveExpenses ",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      approvalSlice.actions.showLoader("Approving expenses...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.approveExpenses(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(approvalSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(approvalSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(approvalSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const managerRejectExpenses = createAsyncThunk(
  "approval/managerRejectExpenses",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      approvalSlice.actions.showLoader("Rejecting expenses...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.rejectExpenses(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(approvalSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(approvalSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(approvalSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default approvalSlice.reducer;
