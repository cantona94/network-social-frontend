import { FC, ReactNode } from "react";
import { Button as NextButton } from "@nextui-org/react";

type Props = {
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
};

export const Button: FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
    >
      {children}
    </NextButton>
  );
};
