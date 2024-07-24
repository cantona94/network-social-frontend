import { FC } from "react";

type Props = {
  children: string;
  size?: string;
};

export const Typography: FC<Props> = ({ children, size = "text-xl" }) => {
  return <p className={`${size}`}>{children}</p>;
};
