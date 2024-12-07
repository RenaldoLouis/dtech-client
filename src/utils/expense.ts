import { DepartmentDetails } from "../constants/interfaces/Department";
import { ExpenseDetails } from "../constants/interfaces/Expense";
import { ProjectDetails } from "../constants/interfaces/Project";
import { userRoles } from "../constants/userRoles";

export const getFiledUnderName = (
  projectTranslate: string,
  deptTranslate: string,
  expense: ExpenseDetails | null | undefined
) => {
  let filedUnder = "";

  if (expense?.project?.external_id && expense?.project?.name) {
    filedUnder = `${projectTranslate} ${expense?.project?.name ?? ""}`;
  } else if (expense?.department?.external_id && expense?.department?.name) {
    filedUnder = `${deptTranslate} ${expense?.department?.name ?? ""}`;
  }

  return filedUnder;
};

// Since managers will return the admin & managers, hence we get the manager role
// If there's no manager, then we get the Admin
export const getDepartmentManagerName = (
  department: DepartmentDetails | null | undefined
) => {
  const managerDepartment = department?.managers?.find(
    (manager) => manager.role === userRoles.MANAGER
  );

  if (managerDepartment) {
    return `${managerDepartment?.first_name ?? ""} ${
      managerDepartment?.last_name ?? ""
    }`;
  }

  const adminDepartment = department?.managers?.find(
    (manager) => manager.role === userRoles.ADMIN
  );

  return `${adminDepartment?.first_name ?? ""} ${
    adminDepartment?.last_name ?? ""
  }`;
};

export const getDepartmentManagerExternalId = (
  department: DepartmentDetails | null | undefined
) => {
  const managerDepartment = department?.managers?.find(
    (manager) => manager.role === userRoles.MANAGER
  );

  if (managerDepartment) {
    return managerDepartment?.external_id ?? "";
  }

  const adminDepartment = department?.managers?.find(
    (manager) => manager.role === userRoles.ADMIN
  );

  return adminDepartment?.external_id ?? "";
};

export const getProjectManagerName = (
  project: ProjectDetails | null | undefined
) => {
  const managerProject = project?.managers?.find(
    (manager) => manager.role === userRoles.MANAGER
  );

  if (managerProject) {
    return `${managerProject?.first_name ?? ""} ${
      managerProject?.last_name ?? ""
    }`;
  }

  const adminProject = project?.managers?.find(
    (manager) => manager.role === userRoles.ADMIN
  );

  return `${adminProject?.first_name ?? ""} ${adminProject?.last_name ?? ""}`;
};

export const getProjectManagerExternalId = (
  project: ProjectDetails | null | undefined
) => {
  const managerProject = project?.managers?.find(
    (manager) => manager.role === userRoles.MANAGER
  );

  if (managerProject) {
    return managerProject?.external_id ?? "";
  }

  const adminProject = project?.managers?.find(
    (manager) => manager.role === userRoles.ADMIN
  );

  return adminProject?.external_id ?? "";
};

export const getPersonInChargeName = (
  expense: ExpenseDetails | null | undefined
) => {
  if (expense?.project) {
    return getProjectManagerName(expense?.project);
  } else if (expense?.department) {
    return getDepartmentManagerName(expense?.department);
  }

  return "";
};
