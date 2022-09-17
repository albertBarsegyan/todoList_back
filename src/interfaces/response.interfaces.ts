export enum ResponseStatuses {
  Success = "success",
  Error = "error",
}

export interface IResponse<T = any> {
  data: T;
  status: ResponseStatuses;
  message: string;
}
