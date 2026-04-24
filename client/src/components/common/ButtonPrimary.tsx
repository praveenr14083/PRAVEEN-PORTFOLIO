import React from "react";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

type ButtonPrimaryProps = {
  children?: React.ReactNode;
  icon?: LucideIcon; // 👈 pass component, not JSX
  iconSize?: number;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onClick?: () => void;
};

export function ButtonPrimary({
  children,
  icon: Icon,
  iconSize = 18,
  className,
  variant,
  onClick,
}: ButtonPrimaryProps) {
  return (
    <Button
      variant={variant}
      className={`bg-primary-color hover:bg-primary-color/90 p-0 text-white flex items-center gap-2 ${className} ${Icon && !children && "size-9"}`}
      onClick={onClick}
    >
      {Icon && <Icon size={iconSize} />}
      {children}
    </Button>
  );
}
