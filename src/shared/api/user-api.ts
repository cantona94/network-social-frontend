import { User } from "@/shared/models";
import { api } from "./base";

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),

    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: userData => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    getUserById: builder.query<User, string>({
      query: id => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<User, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),

    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCurrentQuery,
  useLazyCurrentQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} = userApi;

export const {
  endpoints: { login, register, getUserById, updateUser, current },
} = userApi;
