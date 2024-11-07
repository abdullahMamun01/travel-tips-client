"use client";

import VerifiedModal from "../profile/VerifiedModal";
import categoryList from "@/lib/categoris";
import { Card, CardContent, CardHeader } from "../ui/card";
import { getEligibility } from "@/services/verified.service";
import useAuth from "@/stores/authSore";
import { useQuery } from "@tanstack/react-query";
import { SubscribeCardSkeleton } from "../skeleton/SubscribeSkeleton";
import { ReactNode } from "react";
import { useSearchStore } from "@/stores/searchStore";
import { Button } from "../ui/button";
export default function RightSidebar() {
  const { auth } = useAuth();
  const { setFilters, filters } = useSearchStore();

  const { data, isLoading } = useQuery({
    queryFn: async () => await getEligibility(auth?.token as string),
    queryKey: ["subscribe"],
    // enabled: auth && auth.user?.isVerified
  });

  console.log(auth?.user);
  let content: ReactNode | null = null;
  if (data?.data && auth?.user?.isVerified === false) {
    content = (
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Subscribe to Premium</h2>
          <p className="text-sm text-muted-foreground">
            Subscribe to unlock new features and if eligible, receive a share of
            revenue.
          </p>
        </CardHeader>
        <CardContent>
          <VerifiedModal />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-md:hidden sticky top-0 space-y-4">
      {isLoading ? <SubscribeCardSkeleton /> : content}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Search by Tag</h2>
        </CardHeader>

        <CardContent className="space-y-1 flex flex-wrap gap-2">
          {categoryList.map((category) => (
            <div key={category} className="space-y-1 ">
              <span
                onClick={() =>
                  setFilters({ ...filters, selectedCategory: category })
                }
                className={`font-semibold cursor-pointer ${
                  filters.selectedCategory === category
                    ? "bg-blue-500 px-2 py-1 rounded-md text-gray-100"
                    : "text-gray-500"
                } `}
              >
                #{category}
              </span>
            </div>
          ))}

     
        </CardContent>
        <div className="px-10 pb-5">
        <Button onClick={() => setFilters({ ...filters, selectedCategory: '' })} className="w-full">Clear</Button>
        </div>
      </Card>
    </div>
  );
}
