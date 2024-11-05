
import PostList from "@/components/post/PostList";

export default function Home() {
  return (

      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 flex">
        <PostList  />
        </div>
      </div>
 
  );
}
