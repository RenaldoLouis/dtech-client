import {
  ExpenseApprovalStatus,
  ExpenseGroupedBy,
  ExpenseModesOfPayment,
} from "../constants/interfaces/Expense";

export interface PaginatedDataResponse<T> {
  data: T[];
  total_page: number;
  next_page: boolean;
}

export type ReceiptUploadType = "image" | "document";

export interface PostCompanyPoliciesPayload {
  type: string;
  policy: any;
}

export interface PostCompanySettingPayload {
  receipt_mandatory: string;
  reminder_frequency: string;
}

export interface PostSignUpFormPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country_code: string;
  city: string;
  profile_image_url?: string;
}

export interface PostOrganizationPayload {
  name: string;
  currency: string;
  website: string;
}

export interface PostInviteManagerPayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  employee_id: string;
}

export interface PatchUserDetailPayload {
  first_name: string;
  last_name: string;
  phone: string;
  country_code: string;
  city: string;
  email: string;
  profile_image_url: string;
}

export interface PostSendEmailLinkPayload {
  email: string;
}

export interface PostCreateDepartmentPayload {
  name: string;
  budget: number;
  description: string;
  budget_start?: string;
  budget_end?: string;
  manager_ids: string[];
  employee_ids: string[];
  currency: string;
}

export interface PostCreateProjectPayload {
  name: string;
  budget: number;
  currency: string;
  budget_start?: string;
  budget_end?: string;
  manager_ids: string[];
  member_ids: string[];
}
export interface ExpensePayload {
  receipt_ids: string[];
  category_id: string;
  department_id?: string;
  project_id?: string;
  date_of_expense: string;
  currency: string;
  amount: number;
  reference_id: string;
  description?: string;
  mode_of_payment: ExpenseModesOfPayment;
  is_reimbursement: boolean;
}

export interface ExpenseQueryParams {
  status?: ExpenseApprovalStatus[];
  group_by?: ExpenseGroupedBy;
  page_no?: number;
  per_page?: number;
  start?: string;
  end?: string;
  analytics?: boolean;
}

export interface ApproveExpensePayload {
  expense_ids: number[];
}

export interface RejectExpensePayload extends ApproveExpensePayload {
  reject_reason: string;
}
export interface CategoryPayload {
  name: string;
  start_date: string;
  end_date: string;
  code: string;
}

export interface PaginationQueryParams {
  page_no: number;
  per_page: number;
}
