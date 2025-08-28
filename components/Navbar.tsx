"use client";

import { cn } from "@/lib/utils";
import mainLogo from "@/public/icon/mainlogo.png";
import whatsappIcon from "@/public/icon/whatsapp.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
const menuItems = [
  { en: "Home", slug: "/" },
  { en: "Pricing", slug: "/pricing" },
  { en: "Employers", slug: "/employers" },
  { en: "Maids", slug: "/maids" },
  { en: "Contact Us", slug: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<any | []>(["English", "Bahasa indonesia", "Burmese", "Mandarin"]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full bg-blackColor z-50 shadow py-3 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-headerColor text-2xl lg:text-3xl font-semibold tracking-wide">
          <Image src={mainLogo} width={80} height={150} alt="logo" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 text-base">
          {menuItems.map((item) => (
            <Link
              key={item.slug}
              href={item.slug}
              className={cn(
                "hover:text-primaryColor font-medium transition",
                pathname === item.slug ? "text-primaryColor" : "text-whiteColor"
              )}
            >
              {item.en}
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
                  <button className="text-base border-b-2 border-transparent cursor-pointer hover:border-primaryColor text-whiteColor">{item}</button>
                </li>
              ))}
            </ul>

          </div>
          <Link
            href="/registration"
            className="bg-secondaryColor text-blackColor flex items-center gap-2 font-medium cursor-pointer  text-base px-5 py-3 rounded-[12px]"
          >
            <Image src={whatsappIcon} alt="whatsappIcon" width={20} height={20} /> Chat Now
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
        "xl:hidden fixed max-w-[80%] md:max-w-[60%] lg:max-w-[40%] top-0 right-0 h-full w-80 bg-blackColor shadow-lg transform transition-transform duration-300 ease-in-out z-50",
        menuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Close button */}
        <div className="flex justify-between items-center p-4">
          <div className="text-headerColor text-xl font-semibold tracking-wide">
            <Image src={mainLogo} width={60} height={70} alt="logo" />
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-whiteColor text-2xl p-1 hover:text-primaryColor transition"
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
                  pathname === item.slug ? "text-primaryColor" : "text-whiteColor"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.en}
              </Link>
            ))}
          </div>
          {/* Mobile Language & Enquire Section */}
          <div className=" py-4 border-t lg:border-t-0 border-gray-200">
            <div className="flex flex-col xl:flex-row xl:items-center sm:justify-between gap-4">
              {/* Language Section */}
              <div className="text-headerColor text-base  gap-2">
                <div className=" gap-3">
                  <div className="flex pb-4 font-semibold items-center gap-2 border-b border-gray-50">
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
                className="bg-secondaryColor flex items-center gap-2 text-blackColor font-medium cursor-pointer text-base px-4 py-2 rounded-[8px]  sm:inline-block text-center w-full sm:w-auto"
                onClick={() => setMenuOpen(false)}
              >
                <Image src={whatsappIcon} alt="whatsappIcon" width={20} height={20} />Chat Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="xl:hidden fixed inset-0  bg-black/50 bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
