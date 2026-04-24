import React from "react";
import Link from "next/link";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { CONTACT_INFO } from "@/utils/contact.const";

export function SocialMedia() {
  // Filter only social media links (those with 'link' property)
  const socialLinks = CONTACT_INFO.filter((item) => item.link);

  return (
    <div className="flex items-center gap-5">
      {socialLinks.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.link as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="
              p-3 rounded-full
              border border-gray-400/20
              hover:border-c-primary
              hover:text-c-primary
              transition-all duration-300
              hover:scale-110
            "
          >
            <Icon size={20} />
          </Link>
        );
      })}
    </div>
  );
}
