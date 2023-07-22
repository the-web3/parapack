export type IResponse<T> = {
  code: number;
  data: T;
  message: string;
};
