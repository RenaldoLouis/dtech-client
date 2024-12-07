interface Policies {
  ADMIN: number;
  EMPLOYEE: number;
  MANAGER: number;
}

export interface CompanyPolicy {
  external_id: string;
  type: string;
  policy: Policies;
}

export interface OrgProfileDetails {
  name: string;
  currency: string;
  website?: string;
  external_id: string;
  policy_doc_url: string;
}

export interface CompanySetting {
  external_id: string;
  receipt_mandatory: boolean;
  reminder_frequency: number;
}
