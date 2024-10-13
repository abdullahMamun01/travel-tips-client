
'use client'
import { getAllUser } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableRow,
  TableHeader,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import useRoleUpdate from "@/hooks/admin/useRoleUpdate";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal, ShieldCheck, User } from "lucide-react";
import React from "react";

//'_id firstName lastName email isDeleted isVerified'
export default function UserManagement() {
  const { mutateAsync, isPending } = useRoleUpdate();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => await getAllUser(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }



  const handleRoleUpdate = async (payload: {
    role: string;
    userId: string;
  }) => {
    await mutateAsync(payload);
  };
  const users = data?.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage your platform users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Input className="max-w-sm" placeholder="Search users..." />
          <Button>Add User</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Profile Status</TableHead>
              <TableHead>Account Status</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead className="font-bold">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  {user.firstName} {user.firstName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.isVerified ? "verified" : "unverified"}
                </TableCell>
                <TableCell>{user.isDeleted ? "Deleted" : "Active"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Block</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>

                <TableCell>
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => {
                      handleRoleUpdate({ role: value, userId: user._id });
                    }}
                  >
                    <SelectTrigger className={`w-[180px]`} disabled={isPending}>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        // className={`${user.role === "user" && "bg-blue-100"}`}
                        value="user"
                      >
                        <div className="flex">
                          <User className="mr-1 w-5 h-5 text-primary" /> user
                        </div>
                      </SelectItem>
                      <SelectItem
                        value="admin"
                        // className={`${user.role === "admin" && "bg-blue-100"}`}
                      >
                        <div className="flex">
                          <ShieldCheck className="mr-1 w-5 h-5 text-primary" />{" "}
                          Admin
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
