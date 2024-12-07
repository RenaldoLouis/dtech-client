import { ExpenseDetails } from "./interfaces/Expense";

export const expenseGroups = {
  CATEGORY: "category",
  DEPARTMENT: "department",
  PROJECT: "project",
} as const;

export const expenseModesOfPayment = {
  PERSONAL_CARD: "PERSONAL_CARD",
  COMPANY_CARD: "COMPANY_CARD",
  CHEQUE: "CHEQUE",
  CASH: "CASH",
} as const;

export const expenseStatuses = {
  SUBMITTED: "SUBMITTED",
  APPROVED: "APPROVED",
  REIMBURSED: "REIMBURSED",
  REJECTED: "REJECTED",
  RESUBMITTED: "RESUBMITTED",
} as const;

export interface BulkApproveResponse {
  error: Record<string, any>;
  success: ExpenseDetails[];
}

export const EXPENSE_API_ITEMS_PER_PAGE = 30;
