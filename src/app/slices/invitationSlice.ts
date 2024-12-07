import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import { ThunkPayloadWithData } from "../store";
import api from "../../services/api";

import { checkResponseWithContent } from "../../utils/request";

interface InvitationLoader {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface InvitationState {
  loader: InvitationLoader;
}

const initialState: InvitationState = {
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const invitationSlice = createSlice({
  name: "invitation",
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
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const hitInviteManagerAPI = createAsyncThunk(
  "invitation/hitInviteManagerAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      invitationSlice.actions.showLoader("Inviting manager...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;
    try {
      const response = await api.invitation.inviteManager(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(invitationSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(invitationSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(invitationSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitInviteEmployeeAPI = createAsyncThunk(
  "invitation/hitInviteEmployeeAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      invitationSlice.actions.showLoader("Inviting employee...")
    );
    const {
      data: [dept_id, thunkPayload],
      onSuccess,
      onError,
    } = payload;

    try {
      const response = await api.invitation.inviteEmployee(
        dept_id,
        thunkPayload
      );
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(invitationSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(invitationSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(invitationSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitInviteBulkManagerAPI = createAsyncThunk(
  "invitation/hitInviteBulkManagerAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      invitationSlice.actions.showLoader("Bulk inviting managers...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;
    try {
      const response = await api.invitation.inviteBulkManager(thunkPayload);

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(invitationSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(invitationSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(invitationSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const hitInviteBulkEmployeeAPI = createAsyncThunk(
  "invitation/hitInviteBulkEmployeeAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      invitationSlice.actions.showLoader("Bulk inviting employees...")
    );
    const {
      data: [dept_id, thunkPayload],
      onSuccess,
      onError,
    } = payload;

    try {
      const response = await api.invitation.inviteBulkEmployee(
        dept_id,
        thunkPayload
      );

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(invitationSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(invitationSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(invitationSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default invitationSlice.reducer;
