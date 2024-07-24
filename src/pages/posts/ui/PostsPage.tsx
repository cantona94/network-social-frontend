import { CreatePost } from "@/features/create-post";
import { useGetAllPostsQuery } from "@/shared/api/post-api";

export const PostsPage = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="w-full flex mb-10">
        <CreatePost />
      </div>
    </>
  );
};
