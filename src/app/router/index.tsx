import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/widgets/layout";
import {
  AuthPage,
  CurrentPostPage,
  FollowersPage,
  FollowingPage,
  PostsPage,
  UserProfilePage,
} from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <PostsPage />,
      },
      {
        path: "post/:id",
        element: <CurrentPostPage />,
      },
      {
        path: "user/:id",
        element: <UserProfilePage />,
      },
      {
        path: "followers",
        element: <FollowersPage />,
      },
      {
        path: "following",
        element: <FollowingPage />,
      },
    ],
  },
]);
