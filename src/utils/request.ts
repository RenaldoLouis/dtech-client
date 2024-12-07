import { AxiosResponse } from "axios";
import HTTP_STATUS_CODES from "../constants/httpCodes";

export const checkSuccessfulRequest = (requestStatus: number) =>
  Object.values(HTTP_STATUS_CODES.SUCCESS).includes(requestStatus);

export const checkResponseWithContent = (
  response: AxiosResponse<any, any> | undefined
) => response && checkSuccessfulRequest(response.status) && response.data;

// NOTE: This is actually for HTTP Responses with 204 No Content, so can also be hardcoded to check for status
export const checkResponseEmptyContent = (
  response: AxiosResponse<any, any> | undefined
) => response && checkSuccessfulRequest(response.status);
