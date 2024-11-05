
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/user/Avatar'
import {  CreditCard, FileText, Users } from 'lucide-react'
import React from 'react'
import AnalyticPayment from './AnalyticPayment'
import { useQuery } from '@tanstack/react-query'
import { overviewAction } from '@/actions/analytic.action'
import OverViewSkeleton from '@/components/skeleton/OverViewSkeleton'

const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "Active" },
  ]

export default function AnalyticOverview() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytic-overview"],
    queryFn: async () => await overviewAction(),
  });

  if(isLoading){
    return <OverViewSkeleton/>
  }

  const overViewData =   data?.data

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overViewData?.user.totalUser}</div>
            <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${overViewData?.revenue.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
            {overViewData?.revenue.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overViewData?.posts.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {/* +22.5% from last month */}
            </p>
          </CardContent>
        </Card>
      
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <AnalyticPayment/>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              Latest user registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {users.slice(0, 5).map((user) => (
                <div className="flex items-center" key={user.id}>
                  <Avatar userId={'1234'} name={user.name}/>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {user.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
