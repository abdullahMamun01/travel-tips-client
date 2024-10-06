
import Posts from "@/components/post/Posts";

export default function Home() {
  return (
    <div className="">
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8 flex">
          <Posts />
        </div>
      </div>
    </div>
  );
}
