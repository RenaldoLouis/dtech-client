export default {
  ROOT: "/",
  BLOCKER: {
    NO_DEPARTMENT: "no_department",
  },
  AUTH: {
    FORGOT_PASSWORD: "forgot_password",
    RESET_PASSWORD: "reset_password",
    LOGIN: "login",
    SIGN_UP: "signup",
    EMAIL_SENT: "email_sent",
    FIREBASE_HANDLER: "verify_email",
    RESEND_EMAIL: "resend_email",
    ORGANIZATION: "organization",
    UPDATE_PROFILE: "update_profile",
  },
  DASHBOARD: {
    ROOT: "dashboard",
    SETTINGS: {
      ROOT: "settings",
      ORG_PROFILE: "org_profile",
      PROFILE: "profile",
      POLICY: "policy",
      LIST: "list",
      EDIT: "edit",
    },
    EXPENSES: {
      ROOT: "expenses",
      CREATE: "new",
      EDIT: "edit/:expense_id",
      DETAILS: "view/:expense_id",
    },
    APPROVALS: {
      ROOT: "approvals",
      CREATE: "new",
      EDIT: "edit/:expense_id",
      DETAILS: "view/:expense_id",
    },
  },
  MANAGER_DASHBOARD: {
    ROOT: "manager_dashboard",
    ANALYTICS: "analytics",
    THIRD_PARTY_INTEGRATION: "third_party_integration",
    WALLET_MANAGEMENT: "wallet_management",
    MY_WALLET: "my_wallet",
    USER_MGMNT: {
      ROOT: "user",
    },
  },
};
