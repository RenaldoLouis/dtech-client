import {
  expenseGroups,
  expenseModesOfPayment,
  expenseStatuses,
} from "../expense";
import { DepartmentDetails } from "./Department";
import { ProjectDetails } from "./Project";
import { UserDetails } from "./Users";

type ExpenseApprovalStatusKeys = keyof typeof expenseStatuses;
export type ExpenseApprovalStatus =
  typeof expenseStatuses[ExpenseApprovalStatusKeys];

type ExpenseModesOfPaymentKeys = keyof typeof expenseModesOfPayment;
export type ExpenseModesOfPayment =
  typeof expenseModesOfPayment[ExpenseModesOfPaymentKeys];

type ExpenseGroupKeys = keyof typeof expenseGroups;
export type ExpenseGroupedBy = typeof expenseGroups[ExpenseGroupKeys];

// TODO: Might want to make a constant out of this
export type AnalyticsFilters =
  | ExpenseGroupedBy
  | "paid_through"
  | "reimbursement";

export interface ExpenseCategory {
  name: string;
  external_id: string;
  start_date: string;
  end_date: string;
  code: string;
  budget: number;
  currency: string;
}

export interface ExpenseReceipt {
  url: string;
  external_id: string;
}

export interface ExpenseDetails {
  date_of_expense: string;
  currency: string;
  amount: number;
  reference_id: string | number;
  description?: string;
  mode_of_payment: string;
  is_reimbursement: boolean;
  expense_id: number;
  status: ExpenseApprovalStatus;
  receipts: ExpenseReceipt[];
  category: ExpenseCategory;
  project?: ProjectDetails;
  department?: DepartmentDetails;
  employee: UserDetails;
}
export interface DummyDetails {
  id: string;
  name: string;
}
