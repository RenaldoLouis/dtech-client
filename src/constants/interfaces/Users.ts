import { userRoles } from "../userRoles";
import { DepartmentDetails } from "./Department";
import { ProjectDetails } from "./Project";

export type UserRoles = keyof typeof userRoles;

export interface UserCompany {
  name: string;
  currency: string;
  website: string;
  external_id: string;
}

export interface UserDetails {
  city: string;
  company: UserCompany | null;
  country_code: string;
  email_verified: boolean;
  email: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile_image_url: string;
  role: UserRoles;
  uid: string;
  external_id: string;
  is_active: boolean;
}

export interface EmployeeDetails extends UserDetails {
  managed_departments: DepartmentDetails[];
  under_department: DepartmentDetails[];
  managed_projects: ProjectDetails[];
  under_projects: ProjectDetails[];
}

export interface BulkInviteUserDetail {
  email: string;
  employee_id: string;
  error_reason: string;
  first_name: string;
  last_name: string;
  phone: string;
}
export interface BulkInviteResponse {
  count_failed: number;
  count_successful: number;
  failed: BulkInviteUserDetail[];
  successful: BulkInviteUserDetail[];
}
