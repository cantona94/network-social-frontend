import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared/ui/button";

type Props = {
  children: ReactNode;
  icon: JSX.Element;
  href: string;
};

export const NavButton: FC<Props> = ({ children, icon, href }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  );
};
