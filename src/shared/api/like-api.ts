import { Like } from "@/shared/models/model-api";
import { api } from "./base";

export const likeApi = api.injectEndpoints({
  endpoints: builder => ({
    likePost: builder.mutation<Like, { postId: string }>({
      query: body => ({
        url: "/like",
        method: "POST",
        body,
      }),
    }),

    unlikePost: builder.mutation<void, string>({
      query: postId => ({
        url: `/like/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnlikePostMutation } = likeApi;

export const {
  endpoints: { likePost, unlikePost },
} = likeApi;
