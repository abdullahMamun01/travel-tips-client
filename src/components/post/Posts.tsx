import { getPosts } from "@/actions/post.action";


import PostList from "./PostList";

export default async function Posts() {
  const data = await getPosts({ pageParam: "1" });

  return (
    <>


      <PostList initialData={data} />
    </>
  );
}
