import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import Hero from "./Hero";

const socialLinks = [
  { Icon: Facebook, href: "https://facebook.com/aroofabove", label: "Facebook", delay: 0 },
  { Icon: Instagram, href: "https://instagram.com/aroofabove", label: "Instagram", delay: 0.1 },
  { Icon: Twitter, href: "https://twitter.com/aroofabove", label: "Twitter", delay: 0.2 },
  { Icon: Linkedin, href: "https://linkedin.com/company/aroofabove", label: "LinkedIn", delay: 0.3 },
  { Icon: Youtube, href: "https://youtube.com/@aroofabove", label: "YouTube", delay: 0.4 }
];

const EnhancedHero = () => {
  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative">
      <Hero />
    </div>
  );
};

export default EnhancedHero;