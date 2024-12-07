import ROUTES from "../constants/routes";

const managerDashboardRootPath = ROUTES.ROOT + ROUTES.MANAGER_DASHBOARD.ROOT;

export const isInManagerDashboardView = (path: string) =>
  path.includes(managerDashboardRootPath);
