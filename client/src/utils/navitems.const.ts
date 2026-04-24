import { User, Code2, Briefcase, FolderKanban, Mail } from "lucide-react";

import { LucideIcon } from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const navitems: NavItem[] = [
  {
    name: "About",
    href: "#about",
    icon: User,
  },
  {
    name: "Skills",
    href: "#skills",
    icon: Code2,
  },
  {
    name: "Projects",
    href: "#projects",
    icon: FolderKanban,
  },
  {
    name: "My Journey",
    href: "#journey",
    icon: Briefcase,
  },
  {
    name: "Contact",
    href: "#contact",
    icon: Mail,
  },
];
