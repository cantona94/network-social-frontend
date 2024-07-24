import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Card as NextUiCard,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
} from "@nextui-org/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FcDislike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { selectCurrent } from "@/entities/user/model/slice";
import { useDeleteCommentMutation } from "@/shared/api/comment-api";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/shared/api/like-api";
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "@/shared/api/post-api";
import { formatToClientDate } from "@/shared/lib/format-to-client-date";
import { hasErrorField } from "@/shared/lib/has-error-field";
import { User } from "@/shared/ui/user";
import { MetaInfo } from "@/shared/ui/meta-info";
import { Typography } from "@/shared/ui/typography";
import { ErrorMessage } from "@/shared/ui/error-message";

type Props = {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  commentsCount?: number;
  createdAt?: Date;
  id?: string;
  cardFor: "comment" | "post" | "current-post";
  likedByUser?: boolean;
};

export const Card = ({
  avatarUrl = "",
  name = "",
  content = "",
  authorId = "",
  id = "",
  likesCount = 0,
  commentsCount = 0,
  cardFor = "post",
  likedByUser = false,
  createdAt,
  commentId = "",
}: Props) => {
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrent);

  const refetch = async () => {
    switch (cardFor) {
      case "post":
        await triggerGetAllPosts().unwrap();
        break;
      case "current-post":
        await triggerGetAllPosts().unwrap();
        break;
      case "comment":
        await triggerGetPostById(id).unwrap();
        break;
      default:
        throw new Error("Неверный аргумент cardFor");
    }
  };

  const handleClick = async () => {
    try {
      likedByUser
        ? await unlikePost(id).unwrap()
        : await likePost({ postId: id }).unwrap();

      await refetch();
    } catch (err) {
      if (hasErrorField(err)) {
        setError(err.data.error);
      } else {
        setError(err as string);
      }
    }
  };

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post":
          await deletePost(id).unwrap();
          await refetch();
          break;
        case "current-post":
          await deletePost(id).unwrap();
          navigate("/");
          break;
        case "comment":
          await deleteComment(commentId).unwrap();
          await refetch();
          break;
        default:
          throw new Error("Неверный аргумент cardFor");
      }
    } catch (err) {
      console.log(err);
      if (hasErrorField(err)) {
        setError(err.data.error);
      } else {
        setError(err as string);
      }
    }
  };

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/user/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibold leading-none text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientDate(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleClick}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcDislike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/post/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  );
};
