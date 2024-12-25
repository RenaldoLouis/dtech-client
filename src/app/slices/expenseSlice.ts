import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { DummyDetails } from './../../constants/interfaces/Expense';

import { ExpenseDetails } from "../../constants/interfaces/Expense";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { RootState, ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface ExpenseLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface ExpenseState {
  expenseDetails: ExpenseDetails[];
  currPage: number;
  hasNextPage: boolean;
  loader: ExpenseLoaderDetails;
  dummyDetails: DummyDetails[];
}

const initialState: ExpenseState = {
  expenseDetails: [],
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },

  dummyDetails: [],
};

export const expenseSlice = createSlice({
  name: "expense",
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
    resetExpenses: (state) => {
      state.expenseDetails = [];
      state.currPage = 1;
      state.hasNextPage = false;
    },
    setExpenseData: (
      state,
      action: PayloadAction<PaginatedDataResponse<DummyDetails>>
    ) => {
      // if (state.currPage === 1) {
      state.dummyDetails = action.payload;
      // } else {
      //   state.dummyDetails = [
      //     ...state.dummyDetails,
      //     ...action.payload.data,
      //   ];
      // }

      state.currPage += action.payload.next_page ? 1 : 0;
      state.hasNextPage = action.payload.next_page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { setExpenseData, resetExpenses } = expenseSlice.actions;

export const selectExpenseDetails = (state: RootState) =>
  state.expense.expenseDetails;
export const selectApprovalLoaderState = (state: RootState) =>
  state.expense.loader;

export const getExpensesForEmployee = createAsyncThunk(
  "expense/getExpensesForEmployee",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(expenseSlice.actions.showLoader("Fetching expenses..."));
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      let response = await api.expenses.fetchExpenseForEmployee(thunkPayload);
      response.data = {
        id: "1",
        name: "asd",
      }
      if (checkResponseWithContent(response)) {
        const paginatedData: PaginatedDataResponse<DummyDetails> =
          response?.data;
        // const paginatedData: PaginatedDataResponse<DummyDetails> =
        // {
        //   id: "1",
        //   name: "asd",
        // },
        // thunkAPI.dispatch(setExpenseData({
        //   id: "1",
        //   name: "asd",
        // },
        // ));
        thunkAPI.dispatch(setExpenseData(paginatedData));
        thunkAPI.dispatch(expenseSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(expenseSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(expenseSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const getExpenseDetails = createAsyncThunk(
  "expense/getExpenseDetails",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      expenseSlice.actions.showLoader("Fetching expense detail...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseDetails(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(expenseSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(expenseSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(expenseSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const getExpenseDetailsForApproval = createAsyncThunk(
  "expense/getExpenseDetailsForApproval",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      expenseSlice.actions.showLoader("Fetching expense detail...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fetchExpenseDetailsForApproval(
        thunkPayload
      );

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(expenseSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(expenseSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(expenseSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const employeeFileExpense = createAsyncThunk(
  "expense/employeeFileExpense",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(expenseSlice.actions.showLoader("Filing expense..."));
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.expenses.fileExpense(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(expenseSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(expenseSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(expenseSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const employeeUpdateExpense = createAsyncThunk(
  "expense/employeeUpdateExpense",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      expenseSlice.actions.showLoader("Resubmitting expense...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    const [expenseId, expenseData] = thunkPayload;

    try {
      const response = await api.expenses.updateExpense(expenseId, expenseData);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(expenseSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(expenseSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(expenseSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default expenseSlice.reducer;
