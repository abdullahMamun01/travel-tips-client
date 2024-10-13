"use server";

import apiClient from "@/api/axios";
import { getCurrentUser } from "./auth.action";
import { TAxiosResponse } from "@/services/service.type";
import { TOverview } from "@/types/analytic.type";

const paymentAnalyticAction = async () => {
  const user = await getCurrentUser();
  const response = await apiClient.get(`/analytics/subscription`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return response.data;
};

const userAnalyticAction = async () => {
  const user = await getCurrentUser();
  const response = await apiClient.get(`/analytics/users`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return response.data;
};

const postsAnalyticAction = async () => {
  const user = await getCurrentUser();
  const response = await apiClient.get(`/analytics/posts`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return response.data;
};

const overviewAction = async (): Promise<TAxiosResponse<TOverview>> => {
  const user = await getCurrentUser();
  const response = await apiClient.get(`/analytics/overview`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });

  return response.data;
};

export {
  paymentAnalyticAction,
  userAnalyticAction,
  postsAnalyticAction,
  overviewAction,
};
