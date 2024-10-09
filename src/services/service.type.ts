export type TAxiosResponse<T> = {
  statusCode: number;
  message: string;
  success: boolean;
  data: T;
};
