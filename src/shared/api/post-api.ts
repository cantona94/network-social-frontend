import { Post } from "@/shared/models";
import { api } from "./base";

export const postApi = api.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<Post, { content: string }>({
      query: postData => ({
        url: "/post",
        method: "POST",
        body: postData,
      }),
    }),

    getAllPosts: builder.query<Post[], void>({
      query: () => ({
        url: "/post",
        method: "GET",
      }),
    }),

    getPostById: builder.query<Post, string>({
      query: id => ({
        url: `/post/${id}`,
        method: "GET",
      }),
    }),

    deletePost: builder.mutation<void, string>({
      query: id => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetAllPostsQuery,
  useGetPostByIdQuery,
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} = postApi;

export const {
  endpoints: { createPost, getAllPosts, getPostById, deletePost },
} = postApi;
