import { Comment } from "@/shared/models";
import { api } from "./base";

export const commentApi = api.injectEndpoints({
  endpoints: builder => ({
    createComment: builder.mutation<Comment, Partial<Comment>>({
      query: newComment => ({
        url: `/comment`,
        method: "POST",
        body: newComment,
      }),
    }),

    deleteComment: builder.mutation<void, string>({
      query: commentId => ({
        url: `/comment/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentApi;

export const {
  endpoints: { createComment, deleteComment },
} = commentApi;
