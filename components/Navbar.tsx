"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import { cn } from "@/lib/utils";

const menuItems = [
  { en: "Home",  slug: "/" },
  { en: "Apartment", slug: "/apartments" },
  { en: "Hotel",  slug: "/hotels" },
  { en: "Tours",  slug: "/tours" },
  { en: "Contact Us",  slug: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<any | []>(["English", "Bahasa indonesia", "Burmese","Mandarin"]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-headerColorColor py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div className="text-headerColor text-3xl font-semibold tracking-wide">
          LOGO
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 text-base">
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={cn(
                "hover:text-primaryColor font-medium transition",
                pathname === item.slug ? "text-primaryColor" : "text-headerColor"
              )}
            >
              { item.en }
            </Link>
          ))}
        </nav>

        {/* Right: Language, Auth Buttons */}
        <div className="hidden xl:flex items-center gap-6">
          <div className="flex items-center gap-5">
            <BsGlobe2 />
            
              <ul className="flex text-descriptionColor  font-medium">
                {language.map((item, index) => (
                  <li key={index} className=" px-2  border-r-2 last-of-type:border-r-0 border-r-borderColor   transition">
                    <button className="text-base border-b-2 border-transparent cursor-pointer hover:border-primaryColor">{item}</button>
                    </li>
                ))}
              </ul>
            
          </div>
         
         
          <Link
            href="/registration"
            className="bg-primaryColor text-blackColor font-medium cursor-pointer  text-base px-4 py-2 rounded-[8px]"
          >
            Enquire now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="xl:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-headerColor text-2xl"
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div className={cn(
        "xl:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Close button */}
        <div className="flex justify-between items-center p-4">
          <div className="text-headerColor text-xl font-semibold tracking-wide">
          LOGO
        </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-headerColor text-2xl p-1 hover:text-primaryColor transition"
          >
            <HiX />
          </button>
        </div>

        {/* Menu Content */}
        <div className="px-4 space-y-4">
          <div className="lg:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={cn(
                "block font-medium text-base ",
                pathname === item.slug ? "text-primaryColor" : "text-headerColor"
              )}
              onClick={() => setMenuOpen(false)}
            >
              { item.en}
            </Link>
          ))}
          </div>
          {/* Mobile Language & Enquire Section */}
          <div className=" py-4 border-t lg:border-t-0 border-gray-200">
            <div className="flex flex-col xl:flex-row xl:items-center sm:justify-between gap-4">
              {/* Language Section */}
              <div className="text-headerColor text-base  gap-2">
                <div className=" gap-3">
                  <div className="flex pb-4 font-semibold items-center gap-2 border-b border-gray-200">
                    <BsGlobe2 />
                    Language
                  </div>
                  <ul className=" space-y-2 text-descriptionColor font-medium text-sm lg:text-base mt-4">
                    {language.map((item, index) => (
                      <li key={index} className=" col-span-1  transition">
                        <button className="text-sm sm:text-base border-b-2 border-transparent cursor-pointer hover:border-primaryColor whitespace-nowrap">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Enquire Button */}
              <Link
                href="/registration"
                className="bg-primaryColor text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-[8px] block sm:inline-block text-center w-full sm:w-auto"
                onClick={() => setMenuOpen(false)}
              >
                Enquire now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
