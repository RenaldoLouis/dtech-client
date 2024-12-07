import { UserDetails } from "./Users";

export interface DepartmentDetails {
  external_id: string;
  name: string;
  budget: number;
  budget_start: string;
  budget_end: string;
  description?: string;
  managers?: UserDetails[];
  currency: string;
}
