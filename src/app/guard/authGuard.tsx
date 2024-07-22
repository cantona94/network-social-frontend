import { Spinner } from "@nextui-org/react";
import { useCurrentQuery } from "@/shared/api/user-api";

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) {
    return <Spinner className="flex m-auto h-screen" />;
  }

  return children;
};
