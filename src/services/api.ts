import { generatePath } from "react-router";

import API_PATHS from "../constants/apiPaths";
import { UserDetails } from "../constants/interfaces/Users";

import http from "./http";

import {
  ApproveExpensePayload,
  CategoryPayload,
  ExpensePayload,
  ExpenseQueryParams,
  PaginationQueryParams,
  PatchUserDetailPayload,
  PostCreateDepartmentPayload,
  PostCreateProjectPayload,
  PostInviteManagerPayload,
  PostOrganizationPayload,
  PostSendEmailLinkPayload,
  PostSignUpFormPayload,
  ReceiptUploadType,
  RejectExpensePayload,
  PostCompanyPoliciesPayload,
  PostCompanySettingPayload,
} from "./api.types";

export default {
  auth: {
    adminSignUp: (payload: PostSignUpFormPayload) =>
      http.post(API_PATHS.AUTH.ADMIN_SIGNUP, payload),
    verifyUserEmail: () => http.post(API_PATHS.AUTH.VERIFY_EMAIL),
    fetchUserDetail: () => http.get(API_PATHS.AUTH.USER_DETAIL),
    updateEmployeeDetails: (payload: PatchUserDetailPayload) =>
      http.patch(API_PATHS.AUTH.USER_DETAIL, payload),
    sendEmailLink: (payload: PostSendEmailLinkPayload) =>
      http.post(API_PATHS.AUTH.RESEND_EMAIL, payload),
  },
  organization: {
    fetchOrgProfiles: () => http.get(API_PATHS.ORG_PROFILE.ROOT),
    createOrganization: (payload: PostOrganizationPayload) =>
      http.post(API_PATHS.ORG_PROFILE.ROOT, payload),
    editOrganization: (payload: PostOrganizationPayload) =>
      http.patch(API_PATHS.ORG_PROFILE.ROOT, payload),
    fetchCompanyPolicies: () => http.get(API_PATHS.ORG_PROFILE.POLICIES),
    createCompanyPolicy: (payload: PostCompanyPoliciesPayload) =>
      http.post(API_PATHS.ORG_PROFILE.POLICIES, payload),
    editCompanyPolicy: (payload: PostCompanyPoliciesPayload) =>
      http.patch(API_PATHS.ORG_PROFILE.POLICIES, payload),
    fetchCompanySettings: () => http.get(API_PATHS.ORG_PROFILE.SETTINGS),
    createCompanySettings: (payload: PostCompanySettingPayload) =>
      http.post(API_PATHS.ORG_PROFILE.SETTINGS, payload),
    editCompanySettings: (payload: PostCompanySettingPayload) =>
      http.patch(API_PATHS.ORG_PROFILE.SETTINGS, payload),
    uploadDocumentPolicy: (payload: FormData) =>
      http.post(API_PATHS.ORG_PROFILE.UPLOAD_DOCS, payload),
  },
  invitation: {
    inviteManager: (payload: PostInviteManagerPayload) =>
      http.post(API_PATHS.INVITATION.MANAGER, payload),
    inviteBulkManager: (payload: FormData) =>
      http.post(API_PATHS.INVITATION.BULK_MANAGER, payload),
    inviteEmployee: (dept_id: string, payload: UserDetails) =>
      http.post(
        generatePath(API_PATHS.INVITATION.EMPLOYEE, { dept_id }),
        payload
      ),
    inviteBulkEmployee: (dept_id: string, payload: FormData) =>
      http.post(
        generatePath(API_PATHS.INVITATION.BULK_EMPLOYEE, { dept_id }),
        payload
      ),
  },
  expenses: {
    fetchExpenseForManager: (queryParamsData: ExpenseQueryParams) =>
      http.get(API_PATHS.EXPENSE.MANAGER_EXPENSES, queryParamsData),
    fetchExpenseForEmployee: (queryParamsData: ExpenseQueryParams) =>
      http.get(API_PATHS.EXPENSE.SELF_EXPENSES, queryParamsData),
    approveExpenses: (payload: ApproveExpensePayload) =>
      http.post(API_PATHS.EXPENSE.APPROVE_EXPENSES, payload),
    rejectExpenses: (payload: RejectExpensePayload) =>
      http.post(API_PATHS.EXPENSE.REJECT_EXPENSES, payload),
    fileExpense: (payload: ExpensePayload) =>
      http.post(API_PATHS.EXPENSE.SELF_EXPENSES, payload),
    updateExpense: (externalId: string, payload: ExpensePayload) =>
      http.patch(
        generatePath(API_PATHS.EXPENSE.SELF_EXPENSE_WITH_ID, {
          expense_id: externalId,
        }),
        payload
      ),
    fetchExpenseDetails: (expenseId: string) =>
      http.get(
        generatePath(API_PATHS.EXPENSE.SELF_EXPENSE_WITH_ID, {
          expense_id: expenseId,
        })
      ),
    fetchExpenseDetailsForApproval: (expenseId: string) =>
      http.get(
        generatePath(API_PATHS.EXPENSE.MANAGER_EXPENSES_WITH_ID, {
          expense_id: expenseId,
        })
      ),
  },
  employees: {
    fetchUsersForOrganizationPaginated: (payload: PaginationQueryParams) =>
      http.get(API_PATHS.USER.ROOT, payload),
    fetchAllUsersForOrganization: () =>
      http.get(API_PATHS.USER.ROOT, { show_active: false }),
    fetchManagedUsersForManager: () => http.get(API_PATHS.USER.MANAGED_USERS),
    deleteUserWithId: (userId: string) =>
      http.delete(
        generatePath(API_PATHS.USER.DELETE, {
          user_id: userId,
        })
      ),
  },
  // TODO: Currently unused
  roles: {
    fetchRoles: () => ({
      status: 200,
      roles: [
        {
          role_id: "1",
          role_name: "Android",
          access: "Full",
          description: "A description",
        },
        {
          role_id: "4",
          role_name: "Venture",
          access: "Min",
          description: "E description",
        },
        {
          role_id: "2",
          role_name: "Sport",
          access: "Full",
          description: "D description",
        },
        {
          role_id: "3",
          role_name: "Travel",
          access: "Max",
          description: "C description",
        },
      ],
    }),
  },
  departments: {
    fetchAllDepartments: () => http.get(API_PATHS.DEPARTMENT.ROOT),
    fetchDepartment: (payload: PaginationQueryParams) =>
      http.get(API_PATHS.DEPARTMENT.ROOT, payload),
    createDepartment: (payload: PostCreateDepartmentPayload) =>
      http.post(API_PATHS.DEPARTMENT.ROOT, payload),
    editDepartment: (
      department_id: string,
      payload: PostCreateDepartmentPayload
    ) =>
      http.patch(
        generatePath(API_PATHS.DEPARTMENT.EDIT, { department_id }),
        payload
      ),
  },
  projects: {
    fetchAllProjects: () => http.get(API_PATHS.PROJECT.ROOT),
    fetchProjects: (payload: PaginationQueryParams) =>
      http.get(API_PATHS.PROJECT.ROOT, payload),
    createProject: (payload: PostCreateProjectPayload) =>
      http.post(API_PATHS.PROJECT.ROOT, payload),
    editProjects: (project_id: string, payload: PostCreateDepartmentPayload) =>
      http.patch(generatePath(API_PATHS.PROJECT.EDIT, { project_id }), payload),
  },
  categories: {
    fetchAllCategories: () => http.get(API_PATHS.CATEGORIES.ROOT),
    fetchCategories: (payload: PaginationQueryParams) =>
      http.get(API_PATHS.CATEGORIES.ROOT, payload),
    createCategory: (payload: CategoryPayload) =>
      http.post(API_PATHS.CATEGORIES.ROOT, payload),
    updateCategory: (category_id: string, payload: CategoryPayload) =>
      http.patch(
        generatePath(API_PATHS.CATEGORIES.EDIT, { category_id }),
        payload
      ),
  },
  receipts: {
    fetchReceipts: (payload: PaginationQueryParams) =>
      http.get(API_PATHS.RECEIPTS.ROOT, payload),
    uploadImageReceipt: (uploadType: ReceiptUploadType, payload: FormData) =>
      http.post(API_PATHS.RECEIPTS.ROOT, payload, { type: uploadType }),
  },
};
