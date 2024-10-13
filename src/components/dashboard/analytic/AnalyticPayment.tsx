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
  BarChart,
  Bar,
} from "recharts";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { paymentAnalyticAction } from "@/actions/analytic.action";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticPayment() {
  const {data ,isLoading} =  useQuery({
    queryKey: ['analytic-payment'] ,
    queryFn : async () => await paymentAnalyticAction()
  })

if(isLoading){
  return <Card className="col-span-4 items-center">
    <div className="w-full">
      <Skeleton className="h-1/2 w-2/3" />

    </div>
  </Card>
}
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Monthly Payments</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            amount: {
              label: "Amount",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="amount" fill="var(--color-amount)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
