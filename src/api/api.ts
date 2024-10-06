import { AxiosError } from "axios";
import apiClient from "./axios";

class ApiError extends Error {
  public statusCode: number;
  public errorMessage: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessage = message;
    this.name = "ApiError";
  }
}

export const apiRequest = async <T>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: T
) => {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      const apiError = new ApiError(
        error.response?.status || 500,
        errorMessage
      );
      throw apiError;
    } else {
      throw new ApiError(500, "An unexpected error occurred");
    }
  }
};
