"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, MountainSnow, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Expeditions",
    href: "/expeditions",
    subLinks: [
      { title: "Summit Climbs", href: "/expeditions/summit-climbs" },
      { title: "Trekking", href: "/expeditions/trekking" },
      { title: "Skiing", href: "/expeditions/skiing" },
    ],
  },
  {
    title: "Regions",
    href: "/regions",
    subLinks: [
      { title: "Himalayas", href: "/regions/himalayas" },
      { title: "Alps", href: "/regions/alps" },
      { title: "Andes", href: "/regions/andes" },
      { title: "Alaska", href: "/regions/alaska" },
    ],
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "About",
    href: "/about",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // GSAP animation for navbar
    gsap.fromTo(
      "header",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-prussianBlue shadow-md py-2" : "bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <MountainSnow className="h-8 w-8" />
          <span className="font-azosans font-bold text-xl tracking-wider">
            SUMMIT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.title} className="relative group">
              {link.subLinks ? (
                <button
                  className="text-white hover:text-blue-200 font-medium flex items-center gap-1 py-2"
                  onClick={() => toggleDropdown(link.title)}
                >
                  {link.title}
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="text-white hover:text-blue-200 font-medium py-2"
                >
                  {link.title}
                </Link>
              )}

              {/* Dropdown menu */}
              {link.subLinks && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden transform opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 origin-top-left z-50">
                  {link.subLinks.map((subLink) => (
                    <Link
                      key={subLink.title}
                      href={subLink.href}
                      className="block px-4 py-3 text-sm text-raisinBlack hover:bg-gray-100 transition-colors"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Contact Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 text-white hover:text-blue-200"
          >
            contact
          </Link>
          <Button className="bg-blueLagoon hover:bg-blueLagoon/90 text-white font-medium">
            Book Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-prussianBlue absolute top-full left-0 right-0 shadow-lg">
          <nav className="container-custom py-4">
            {navLinks.map((link) => (
              <div key={link.title} className="py-2">
                {link.subLinks ? (
                  <>
                    <button
                      className="text-white w-full text-left flex items-center justify-between py-2"
                      onClick={() => toggleDropdown(link.title)}
                    >
                      {link.title}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {activeDropdown === link.title && (
                      <div className="pl-4 mt-2 space-y-2 border-l-2 border-blueLagoon">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.title}
                            href={subLink.href}
                            className="block py-2 text-blue-100 hover:text-white"
                            onClick={toggleMenu}
                          >
                            {subLink.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-white py-2"
                    onClick={toggleMenu}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 border-t border-blueLagoon pt-4 flex flex-col gap-4">
              <Link
                href="/contact"
                className="flex items-center gap-2 text-white"
              >
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </Link>
              <Button className="bg-blueLagoon text-white">Book Now</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
