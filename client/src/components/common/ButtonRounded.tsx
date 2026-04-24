import { Button } from "../ui/button";
import { LucideIcon, MoveUpRight } from "lucide-react";

type ButtonRoundedProps = {
  children?: React.ReactNode;
  icon?: LucideIcon;
  iconSize?: number;
  className?: string;
  onClick?: () => void;
};

export function ButtonRounded({
  children,
  icon: Icon = MoveUpRight,
  iconSize = 18,
  className,
  onClick,
}: ButtonRoundedProps) {
  return (
    <button
      className={`group rounded-full flex items-center p-1 bg-primary-color hover:bg-foreground transition-all duration-200 ${className} `}
      onClick={onClick}
    >
      <span
        className={`${children ? "ml-2 px-2" : ""} text-white group-hover:text-background`}
      >
        {children}
      </span>
      {Icon && (
        <div className="size-9 bg-white rounded-full flex items-center justify-center text-black group-hover:bg-primary-color group-hover:text-white shadow-xl">
          <Icon size={iconSize} />
        </div>
      )}
    </button>
  );
}
