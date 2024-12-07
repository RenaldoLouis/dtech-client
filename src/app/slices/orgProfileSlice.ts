import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

import api from "../../services/api";
import { ThunkPayload, ThunkPayloadWithData } from "../store";

import { checkResponseWithContent } from "../../utils/request";
import {
  CompanyPolicy,
  CompanySetting,
  OrgProfileDetails,
} from "../../constants/interfaces/OrgProfile";

interface OrgProfileLoader {
  loading: boolean;
  message: string;
  error: string | undefined;
}

export interface OrgProfileState {
  orgProfile: OrgProfileDetails | null;
  companyPolicies: CompanyPolicy | null;
  companySetting: CompanySetting | null;
  loader: OrgProfileLoader;
}

const initialState: OrgProfileState = {
  orgProfile: null,
  companyPolicies: null,
  companySetting: null,
  loader: {
    loading: false,
    message: "",
    error: undefined,
  },
};

export const orgProfileSlice = createSlice({
  name: "orgProfile",
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
    resetOrgProfile: (state) => {
      state.orgProfile = null;
    },
    setOrgProfile: (state, action: PayloadAction<OrgProfileDetails>) => {
      state.orgProfile = action.payload;
    },
    setCompanyPolicies: (state, action: PayloadAction<CompanyPolicy>) => {
      state.companyPolicies = action.payload;
    },
    setCompanySetting: (state, action: PayloadAction<CompanySetting>) => {
      state.companySetting = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const hitCreateOrgAPI = createAsyncThunk(
  "orgProfile/hitCreateOrgAPI",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Creating organization...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.organization.createOrganization(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(
          orgProfileSlice.actions.setOrgProfile({
            name: response?.data.name ?? "",
            currency: response?.data.currency ?? "SAR",
            website: response?.data.website ?? "",
            external_id: response?.data.external_id,
            policy_doc_url: response?.data.policy_doc_url ?? "",
          })
        );
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());

        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const uploadDocumentPolicy = createAsyncThunk(
  "category/uploadDocumentPolicy",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Uploading document policy...")
    );

    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.organization.uploadDocumentPolicy(
        thunkPayload
      );

      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess(response?.data);
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchOrgProfile = createAsyncThunk(
  "orgProfile/fetchOrgProfile",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Fetching organization profile...")
    );
    const { onSuccess, onError } = payload;

    // Reset upon fetching so old data doesn't persist
    thunkAPI.dispatch(orgProfileSlice.actions.resetOrgProfile());

    try {
      const response = await api.organization.fetchOrgProfiles();
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(
          orgProfileSlice.actions.setOrgProfile({
            name: response?.data.name ?? "",
            currency: response?.data.currency ?? "SAR",
            website: response?.data.website ?? "",
            external_id: response?.data.external_id,
            policy_doc_url: response?.data.policy_doc_url ?? "",
          })
        );
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const editOrgProfile = createAsyncThunk(
  "orgProfile/editOrgProfile",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Updating organization...")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;

    try {
      const response = await api.organization.editOrganization(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(
          orgProfileSlice.actions.setOrgProfile({
            name: response?.data.name ?? "",
            currency: response?.data.currency ?? "SAR",
            website: response?.data.website ?? "",
            external_id: response?.data.external_id,
            policy_doc_url: response?.data.policy_doc_url ?? "",
          })
        );
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());

        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchCompanyPolicies = createAsyncThunk(
  "orgProfile/fetchCompanyPolicies",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Fetching company policies")
    );
    const { onSuccess, onError } = payload;
    try {
      const response = await api.organization.fetchCompanyPolicies();
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(
          orgProfileSlice.actions.setCompanyPolicies(response?.data)
        );
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const createCompanyPolicy = createAsyncThunk(
  "orgProfile/createCompanyPolicy",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Creating company policy")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;
    try {
      const response = await api.organization.createCompanyPolicy(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const editCompanyPolicy = createAsyncThunk(
  "orgProfile/editCompanyPolicy",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Editing company policy")
    );
    const { data: thunkPayload, onSuccess, onError } = payload;
    try {
      const response = await api.organization.editCompanyPolicy(thunkPayload);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const fetchCompanySettings = createAsyncThunk(
  "orgProfile/fetchCompanySettings",
  async (payload: ThunkPayload, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Fetching company settings")
    );
    const { onSuccess, onError } = payload;
    try {
      const response = await api.organization.fetchCompanySettings();
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(
          orgProfileSlice.actions.setCompanySetting(response?.data)
        );
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const createCompanySettings = createAsyncThunk(
  "orgProfile/createCompanySettings",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Creating company settings")
    );
    const { data, onSuccess, onError } = payload;
    try {
      const response = await api.organization.createCompanySettings(data);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export const editCompanySettings = createAsyncThunk(
  "orgProfile/editCompanySettings",
  async (payload: ThunkPayloadWithData, thunkAPI) => {
    thunkAPI.dispatch(
      orgProfileSlice.actions.showLoader("Editing company settings")
    );
    const { data, onSuccess, onError } = payload;
    try {
      const response = await api.organization.editCompanySettings(data);
      if (checkResponseWithContent(response)) {
        thunkAPI.dispatch(orgProfileSlice.actions.hideLoader());
        if (onSuccess) onSuccess();
      } else {
        console.warn(response);

        const error = response?.data;
        const errorMessage = error?.message ?? "Something went wrong!";
        thunkAPI.dispatch(orgProfileSlice.actions.showError(errorMessage));
        if (onError) onError(errorMessage);
      }
    } catch (error: any) {
      console.error(error);

      const errMessage =
        error.response?.data?.message ??
        error.message ??
        "Something went wrong";

      thunkAPI.dispatch(orgProfileSlice.actions.showError(errMessage));
      if (onError) onError(errMessage);
    }
  }
);

export default orgProfileSlice.reducer;
