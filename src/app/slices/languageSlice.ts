import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { i18n } from "../../i18n";
import { localStorageSiteLang } from "../../services/localStorage";
import { RootState, AppThunk } from "../store";

type SiteLanguage = "en" | "ar";

interface LanguageState {
  siteLanguage: SiteLanguage;
}

const initialState: LanguageState = {
  siteLanguage:
    (localStorageSiteLang.get() as SiteLanguage | undefined) ?? "ar",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SiteLanguage>) => {
      state.siteLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export const selectSiteLanguage = (state: RootState) =>
  state.language.siteLanguage;

export const setSiteLanguage =
  (siteLang: SiteLanguage): AppThunk =>
  (dispatch) => {
    dispatch(setLanguage(siteLang));
    i18n.changeLanguage(siteLang);
    localStorageSiteLang.set(siteLang);
  };

export default languageSlice.reducer;
