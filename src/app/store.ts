import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import analyticsReducer from "./slices/analyticsSlice";
import approvalReducer from "./slices/approvalSlice";
import categoryReducer from "./slices/categorySlice";
import departmentReducer from "./slices/departmentSlice";
import employeeDashboardReducer from "./slices/employeeDashboardSlice";
import employeeReducer from "./slices/employeeSlice";
import expenseReducer from "./slices/expenseSlice";
import exportReducer from "./slices/exportSlice";
import invitationReducer from "./slices/invitationSlice";
import languageReducer from "./slices/languageSlice";
import managerDashboardReducer from "./slices/managerDashboardSlice";
import orgProfileReducer from "./slices/orgProfileSlice";
import projectReducer from "./slices/projectSlice";
import receiptReducer from "./slices/receiptSlice";
import roleReducer from "./slices/roleSlice";

// src : https://medium.com/geekculture/redux-persist-redux-toolkit-implementation-made-easy-for-react-native-and-react-js-831ee1e3f22b
// We integrate redux-persist here to restore the session based on last selected store
const appReducer = combineReducers({
  language: languageReducer,
  expense: expenseReducer,
  employees: employeeReducer,
  roles: roleReducer,
  departments: departmentReducer,
  projects: projectReducer,
  approval: approvalReducer,
  employeeDashboard: employeeDashboardReducer,
  managerDashboard: managerDashboardReducer,
  orgProfile: orgProfileReducer,
  invitation: invitationReducer,
  category: categoryReducer,
  receipt: receiptReducer,
  export: exportReducer,
  analytics: analyticsReducer,
});

// In this case we're whitelisting only certain stores that are essential
// to be persisted, other stores will not not be persisted
const persistConfig = {
  key: "root",
  storage,
  // TODO: We might have some discrepancy when the auth token is expired, investigate later
  whitelist: ["auth", "language"],
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export interface ThunkPayload {
  onSuccess?: (...args: any[]) => any;
  onError?: (...args: any[]) => any;
}

export interface ThunkPayloadWithData extends ThunkPayload {
  data: any;
}
