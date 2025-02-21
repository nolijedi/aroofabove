'use client';

import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const siteMapLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/why-choose-us", label: "Why Choose Us" },
    { href: "/insurance-claims", label: "Insurance Claims" },
    { href: "/financing", label: "Financing" },
    { href: "/faq", label: "FAQ" },
    { href: "/product", label: "Products" },
    { href: "/careers", label: "Careers" },
    { href: "/estimate", label: "Get Estimate" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-black text-white">
      {/* Sitemap Links */}
      <div className="max-w-7xl mx-auto px-4 py-4 border-b border-white/10">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {siteMapLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-roofing-orange transition-colors text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 relative">
          {/* Social Media Links */}
          <div className="flex items-center justify-center w-full md:w-auto space-x-6 md:space-x-4">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/aroofabovellc/" },
              { Icon: Instagram, href: "https://instagram.com/a_roof_above_llc" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/aroofabove/" }
            ].map(({ Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-110"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-roofing-cream hover:text-roofing-orange transition-colors duration-300" />
              </a>
            ))}
          </div>

          {/* Contact Information */}
          <div className="text-center w-full md:pl-28">
            <p className="text-sm mb-1 md:mb-2">
              <span className="font-medium">Phone: </span>
              <a href="tel:509-400-5911" className="hover:text-roofing-orange transition-colors">509-400-5911</a>
            </p>
            <p className="text-sm">
              <span className="font-medium">Email: </span>
              <a href="mailto:jc@aroofabove.com" className="hover:text-roofing-orange transition-colors">jc@aroofabove.com</a>
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/careers" className="hover:text-roofing-orange transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/application" className="hover:text-roofing-orange transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-roofing-orange transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p> {new Date().getFullYear()} A Roof Above. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;