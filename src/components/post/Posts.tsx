
import PostCard from "./PostCard";

import { ScrollArea } from "../ui/scroll-area";
import SearchBox from "../serach/SearchBox";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import apiClient from "@/api/axios";
import { IPostResponse } from "@/types/post.type";



const posts = async () => {
  const response = await apiClient.get("/posts");
  return response.data;
};
export default async function Posts() {
  const queryClient = new QueryClient();
  const { data }: { data: IPostResponse } = await queryClient.fetchQuery({
    queryKey: ["posts"],
    queryFn: posts,
  });

  return (
    <main className="flex-1">
      <div className="mb-8">
        <SearchBox />
      </div>

      <ScrollArea className="h-[calc(100vh-50px)]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="space-y-6">
            {data?.data?.map((post) => (
              <PostCard key={post._id} {...post} />
            ))}
          </div>
        </HydrationBoundary>
      </ScrollArea>
    </main>
  );
}
