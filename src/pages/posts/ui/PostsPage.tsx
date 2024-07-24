import { CreatePost } from "@/features/create-post";
import { useGetAllPostsQuery } from "@/shared/api/post-api";
import { Card } from "@/widgets/card";

export const PostsPage = () => {
  const { data } = useGetAllPostsQuery();

  return (
    <>
      <div className="w-full flex mb-10">
        <CreatePost />
      </div>
      {data && data.length > 0
        ? data.map(
            ({
              content,
              author,
              id,
              authorId,
              comments,
              likes,
              likedByUser,
              createdAt,
            }) => (
              <Card
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author.name ?? ""}
                likesCount={likes.length}
                commentsCount={comments.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              />
            )
          )
        : null}
    </>
  );
};
