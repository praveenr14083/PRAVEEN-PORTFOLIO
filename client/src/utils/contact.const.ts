import {
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";

export const PERSONAL_DATA = {
  name: "Praveen R",
  email: "praveenr14083@gmail.com",
  phone: "9442574617",
  linkedin: "https://linkedin.com/in/praveenr14083",
  github: "https://github.com/praveenr14083",
  location: "Kanniyakumari, India",
};

export const CONTACT_INFO = [
  {
    id: 1,
    label: "Email",
    link: `mailto:${PERSONAL_DATA.email}`,
    icon: Mail,
  },
  {
    id: 2,
    label: "LinkedIn",
    link: `${PERSONAL_DATA.linkedin}`,
    icon: Linkedin,
  },
  {
    id: 3,
    label: "GitHub",
    link: `${PERSONAL_DATA.github}`,
    icon: Github,
  },
  {
    id: 4,
    label: "WhatsApp",
    link: `https://wa.me/91${PERSONAL_DATA.phone}`,
    icon: MessageCircle,
  },
  {
    id: 5,
    label: "Phone",
    value: `+91${PERSONAL_DATA.phone}`,
    icon: Phone,
  },
  {
    id: 6,
    label: "Location",
    value: `${PERSONAL_DATA.location}`,
    icon: MapPin,
  },
];
