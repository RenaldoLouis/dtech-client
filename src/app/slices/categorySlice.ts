import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { ExpenseCategory } from "../../constants/interfaces/Expense";

import api from "../../services/api";
import { PaginatedDataResponse } from "../../services/api.types";
import { ThunkPayload, ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";

interface CategoryLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface CategoryState {
  categories: ExpenseCategory[];
  loader: CategoryLoaderDetails;
  edit_id: string | null;
  currPage: number;
  hasNextPage: boolean;
}

const initialState: CategoryState = {
  categories: [],
  edit_id: null,
  currPage: 1,
  hasNextPage: false,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const categorySlice = createSlice({
  name: "category",
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
    resetCategories: (state) => {
      state.currPage = 1;
      state.hasNextPage = false;
      state.categories = [];
    },
    setCategories: (
      state,
      action: PayloadAction<PaginatedDataResponse<ExpenseCategory>>
    ) => {
      if (state.currPage === 1) {
        state.categories = action.payload.data;
      } else {
        state.categories = [...state.categories, ...action.payload.data];
      }

      state.currPage += action.payload.next_page ? 1 : 0;
      state.hasNextPage = action.payload.next_page;
    },
    setCategoryEditId: (state, action: PayloadAction<string | null>) => {
      state.edit_id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { setCategories, resetCategories, setCategoryEditId } =
  categorySlice.actions;

export const fetchCategoriesPaginated = createAsyncThunk(
  "category/fetchCategoriesPaginated",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      categorySlice.actions.showLoader("Fetching categories...")
    );

    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.categories.fetchCategories(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setCategories(response?.data));
        thunkAPI.dispatch(categorySlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(categorySlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(categorySlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      categorySlice.actions.showLoader("Fetching categories...")
    );

    const { onSuccess, onError } = payload;

    try {
      const response = await api.categories.fetchAllCategories();

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(setCategories(response?.data));
        thunkAPI.dispatch(categorySlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(categorySlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(categorySlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitCreateCategoryAPI = createAsyncThunk(
  "category/hitCreateCategoryAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(categorySlice.actions.showLoader("Creating category..."));

    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.categories.createCategory(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(categorySlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(categorySlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(categorySlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitUpdateCategoryAPI = createAsyncThunk(
  "category/hitUpdateCategoryAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(categorySlice.actions.showLoader("Updating category..."));

    const { data: thunkPayload, onSuccess, onError } = payload;

    const [categoryId, updateData] = thunkPayload;

    try {
      const response = await api.categories.updateCategory(
        categoryId,
        updateData
      );

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(categorySlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(categorySlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(categorySlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default categorySlice.reducer;
