/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import apiClient from "@/api/axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (formData: FieldValues) => {
  try {
    const response = await apiClient.post("/auth/login", formData);
    cookies().set("accessToken", response.data.token);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      userId: decodedToken.userId,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      role: decodedToken.role,
      token: accessToken
    };
  }

  return decodedToken;
};
