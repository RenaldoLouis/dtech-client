export default {
  AUTH: {
    ADMIN_SIGNUP: "/secure/admin/sign-up",
    VERIFY_EMAIL: "/secure/verify_email",
    USER_DETAIL: "/secure/profile",
    RESEND_EMAIL: "/resend_verify",
  },
  ORG_PROFILE: {
    ROOT: "/secure/company",
    POLICIES: "/secure/company/policies",
    SETTINGS: "/secure/company/settings",
    UPLOAD_DOCS: "secure/upload?type=document",
  },
  USER: {
    ROOT: "secure/company/users",
    MANAGED_USERS: "secure/users/managed",
    EMPLOYEE: "secure/company/users?role=employee",
    MANAGER: "secure/company/users?role=manager",
    DELETE: "secure/company/users/:user_id",
  },
  DEPARTMENT: {
    ROOT: "/secure/departments",
    EDIT: "/secure/departments/:department_id",
  },
  PROJECT: {
    ROOT: "/secure/projects",
    EDIT: "/secure/projects/:project_id",
  },
  INVITATION: {
    MANAGER: "/secure/invite/manager",
    BULK_MANAGER: "/secure/invite/manager/bulk",
    EMPLOYEE: "/secure/invite/:dept_id/employee",
    BULK_EMPLOYEE: "/secure/invite/:dept_id/employee/bulk",
  },
  EXPENSE: {
    SELF_EXPENSES: "/secure/expenses/self",
    SELF_EXPENSE_WITH_ID: "/secure/expenses/self/:expense_id",
    MANAGER_EXPENSES: "/secure/expenses",
    MANAGER_EXPENSES_WITH_ID: "/secure/expenses/:expense_id",
    APPROVE_EXPENSES: "/secure/expenses/approve",
    REJECT_EXPENSES: "/secure/expenses/reject",
  },
  CATEGORIES: {
    ROOT: "/secure/expenses/categories",
    EDIT: "/secure/expenses/categories/:category_id",
  },
  RECEIPTS: {
    ROOT: "/secure/receipts",
  },
};
