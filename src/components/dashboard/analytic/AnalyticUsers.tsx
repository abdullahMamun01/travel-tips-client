import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userAnalyticAction } from "@/actions/analytic.action";

import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytic-users"],
    queryFn: async () => await userAnalyticAction(),
  });

  if (isLoading) {
    return (
      <Card className="col-span-2 max-md:col-span-4">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          {/* Skeleton for loading state */}
          <Skeleton className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
    );
  }
  return (
    <Card className="col-span-2 max-md:col-span-4">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 w-full">
        <ChartContainer
          config={{
            users: {
              label: "Users",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data?.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="users"
                stroke="var(--color-users)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
