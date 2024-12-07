import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ExpenseReceipt } from "../../constants/interfaces/Expense";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface ReceiptLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface ReceiptState {
  receipts: ExpenseReceipt[];
  loader: ReceiptLoaderDetails;
  currPage: number;
  hasNextPage: boolean;
}

const initialState: ReceiptState = {
  receipts: [],
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const receiptSlice = createSlice({
  name: "receipt",
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
    resetReceipts: (state) => {
      state.currPage = 1;
      state.hasNextPage = false;
      state.receipts = [];
    },
    setReceipts: (
      state,
      action: PayloadAction<PaginatedDataResponse<ExpenseReceipt>>
    ) => {
      if (state.currPage === 1) {
        state.receipts = action.payload.data;
      } else {
        state.receipts = [...state.receipts, ...action.payload.data];
      }

      state.currPage += action.payload.next_page ? 1 : 0;
      state.hasNextPage = action.payload.next_page;
    },
  },
});

export const { resetReceipts, setReceipts } = receiptSlice.actions;

export const fetchReceipts = createAsyncThunk(
  "receipt/fetchReceipts",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(receiptSlice.actions.showLoader("Fetching receipts..."));

    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.receipts.fetchReceipts(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setReceipts(response?.data));
        thunkAPI.dispatch(receiptSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(receiptSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(receiptSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitCreateReceiptAPI = createAsyncThunk(
  "category/hitCreateReceiptAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(receiptSlice.actions.showLoader("Creating receipt..."));

    const { data: thunkPayload, onSuccess, onError } = payload;

    const [uploadType, formData] = thunkPayload;

    try {
      const response = await api.receipts.uploadImageReceipt(
        uploadType,
        formData
      );

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(receiptSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(receiptSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(receiptSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default receiptSlice.reducer;
