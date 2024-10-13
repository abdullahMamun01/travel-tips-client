import { getAllPosts } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardDescription  ,CardHeader,CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table,TableBody  ,TableRow ,TableHeader,TableHead ,TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import React from "react";

  //'_id firstName lastName email isDeleted isVerified'
export default function PostsManagement() {
  const {data , isLoading} = useQuery({
    queryKey: ['admin-posts'] ,
    queryFn: async () => await getAllPosts()
  })

  if(isLoading){
    return <div>Loading...</div>
  }
  const posts = data?.data
  return (
    <Card>
    <CardHeader>
      <CardTitle>Content Management</CardTitle>
      <CardDescription>Manage your platform content</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between mb-4">
        <Input className="max-w-sm" placeholder="Search content..." />
        <Button>Add New Post</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post._id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.user?.firstName} {" "} {post.user?.lastName}</TableCell>
              <TableCell>{post?.createdAt ? new Date(post?.createdAt).toDateString() : ""}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  );
}
