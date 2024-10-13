import { getAllPayment } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

import React from "react";



export default function PaymentManagement() {
  const {data,isLoading} = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => await getAllPayment(),
  });

  if(isLoading){
    return <div>Loading...</div>
  }
const paymentData  = data?.data

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
        <CardDescription>View and manage payments</CardDescription>
      </CardHeader>
      <CardContent>
      
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Subscription type</TableHead>

              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentData?.map((payment) => (
              <TableRow key={payment._id}>
                <TableCell>{payment.user.firstName} {" "} {payment.user.lastName}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment?.createdAt ? new Date(payment?.createdAt ).toDateString() : ""}</TableCell>
                <TableCell>
                    <Badge className="bg-teal-600">
                    {payment?.subscription?.subscriptionType}
                    </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-teal-600">{payment.paymentStatus}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
