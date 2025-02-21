'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import DesktopNav from "./navbar/DesktopNav";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/services", label: "Services" },
    { path: "/why-choose-us", label: "Why Choose Us" },
    { path: "/insurance-claims", label: "Insurance Claims" },
    { path: "/financing", label: "Financing" },
    { 
      path: "/resources",
      label: "Resources",
      dropdown: [
        { path: "/faq", label: "FAQ" },
        { path: "/product", label: "Product" },
        { path: "/careers", label: "Careers" },
        { path: "/application", label: "Apply Now" },
        { path: "/admin", label: "Admin Portal" },
      ]
    },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
        isHomePage ? 'top-8' : 'top-0'
      } ${
        isScrolled 
          ? "bg-white/10 backdrop-blur-sm shadow-lg" 
          : isHomePage 
            ? "bg-roofing-charcoal/95" 
            : "bg-transparent"
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-[84px] relative">
          {/* Logo */}
          <div className="w-[160px] flex-shrink-0 py-3 mt-2">
            <Link 
              href="/"
              className="transition-transform duration-500 hover:scale-105 block relative"
            >
              <Image 
                src="/images/logo-new1.png"
                alt="A Roof Above"
                width={160}
                height={48}
                priority
                className="w-full h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav 
            navItems={navItems.filter(item => item.path !== '/contact')} 
            currentPath={pathname}
          />

          {/* Mobile Navigation */}
          <HamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
