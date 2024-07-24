import { FC } from "react";
import { User as NextUiUser } from "@nextui-org/react";
import { BASE_URL } from "@/shared/config/base-url";

type Props = {
  name: string;
  avatarUrl: string;
  description?: string;
  className?: string;
};

export const User: FC<Props> = ({
  name = "",
  description = "",
  avatarUrl = "",
  className = "",
}) => {
  return (
    <NextUiUser
      name={name}
      className={className}
      description={description}
      avatarProps={{
        src: `${BASE_URL}${avatarUrl}`,
      }}
    />
  );
};
