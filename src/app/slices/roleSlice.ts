// TODO: Currently unused
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import api from "../../services/api";
import { ThunkPayload } from "../store";

export interface RoleDetails {
  role_id: string | number;
  role_name: string;
  access: string;
  description: string;
}

interface RoleLoaderDetails {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface RoleState {
  roles: RoleDetails[];
  loader: RoleLoaderDetails;
}

const initialState: RoleState = {
  roles: [],
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const roleSlice = createSlice({
  name: "roles",
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
    setRoles: (state, action: PayloadAction<RoleDetails[]>) => {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const fetchRolesForOrganization = createAsyncThunk(
  "roles/fetchRolesForOrganization",
  async (payload: ThunkPayload, thunkAPI) => {
    const { onSuccess, onError } = payload;

    try {
      const response = api.roles.fetchRoles();

      if (response.status === 200) {
        // Currently hardcoding the check
        thunkAPI.dispatch(roleSlice.actions.setRoles(response.roles));
        thunkAPI.dispatch(roleSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const errorMessage = "Something went wrong!";
        thunkAPI.dispatch(roleSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(roleSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default roleSlice.reducer;
