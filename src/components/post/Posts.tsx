

import PostList from "./PostList";
import { unstable_noStore as NoStore} from "next/cache";

export default async function Posts() {
  NoStore()


  return (
    <>
      <PostList  />
    </>
  );
}
