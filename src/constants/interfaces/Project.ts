import { UserDetails } from "./Users";

export interface ProjectDetails {
  external_id: string;
  name: string;
  budget: number;
  budget_start: string;
  budget_end: string;
  managers: UserDetails[];
  members: UserDetails[];
  currency: string;
}
