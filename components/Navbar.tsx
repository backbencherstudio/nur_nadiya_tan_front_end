"use client";

import { cn } from "@/lib/utils";
import mainLogo from "@/public/icon/mainlogo.png";
import whatsappIcon from "@/public/icon/whatsapp.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import LanguageSwitcherLG from "./home/LanguageLG";
import { useLanguage } from "./home/LanguageProvider";
import LanguageSwitcher from "./home/LanguageSwitcher";
const menuItems = [
  { en: "Home", slug: "/" },
  { en: "Pricing", slug: "/pricing" },
  { en: "Employers", slug: "/employers" },
  { en: "Maids", slug: "/maids" },
  { en: "Contact Us", slug: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<any | []>([
    { code: "en", name: "English", flag: "https://flagcdn.com/w20/gb.png" },
    { code: "id", name: "Bahasa indonesia", flag: "https://flagcdn.com/w20/id.png" },
    { code: "my", name: "Burmese", flag: "https://flagcdn.com/w20/mm.png" },
    { code: "zh-CN", name: "Mandarin", flag: "https://flagcdn.com/w20/cn.png" },
  ]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const { setSelectedLang: setContextLang } = useLanguage();
  const phoneNumber = "+88972767";
  const message = "Hello! I'm interested in viewing available maid profiles.";
  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLang(savedLanguage);

    }
  }, [selectedLang]);
  const handleLang = (value) => {
    setContextLang(value)
    setSelectedLang(value)
    localStorage.setItem('selectedLanguage', value);
  }
  return (
    <header className="sticky top-0 left-0 w-full bg-blackColor z-50 shadow py-3 px-3 ">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <div className="text-headerColor text-2xl lg:text-3xl font-semibold tracking-wide">
          <Link href="/"><Image src={mainLogo} width={80} height={150} alt="logo" className="w-14 md:w-[60p lg:w-20" /></Link>
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
        <div className="hidden 2xl:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <BsGlobe2 className="text-whiteColor" />
            <LanguageSwitcherLG />
          </div>
          <Link
            href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
            target="_blank"
            className="bg-secondaryColor text-blackColor flex items-center gap-2 font-medium cursor-pointer  text-base px-5 py-3 rounded-[12px]">
            <Image src={whatsappIcon} alt="whatsappIcon" width={20} height={20} /> Chat Now
          </Link>
        </div>
        {/* Mobile Menu Toggle */}
        <div className="2xl:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-whiteColor text-2xl lg:hidden">
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
          <div className=" hidden lg:block py-4 border-t lg:border-t-0 border-gray-200">
            <div className="flex flex-col xl:flex-row xl:items-center sm:justify-between gap-4">
              {/* Enquire Button */}
              <Link
                href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                className="bg-secondaryColor flex items-center gap-2 text-blackColor font-medium cursor-pointer  text-base px-4 py-2 justify-center rounded-[8px] text-center w-full sm:w-auto"
                onClick={() => setMenuOpen(false)}
              >
                <Image src={whatsappIcon} alt="whatsappIcon" width={20} height={20} /> <span className="whitespace-nowrap">Chat Now</span>
              </Link>
            </div>
          </div>
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
            <Image src={mainLogo} width={60} height={70} alt="logo " className="w-12 md:w-[60px]" />
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
          <div className="lg:hidden space-y-4">
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
              {/* Enquire Button */}
              <Link
                href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                className="bg-secondaryColor flex items-center gap-2 text-blackColor font-medium cursor-pointer  text-base px-4 py-2 justify-center rounded-[8px] text-center w-full sm:w-auto"
                onClick={() => setMenuOpen(false)}
              >
                <Image src={whatsappIcon} alt="whatsappIcon" width={20} height={20} /> <span className="whitespace-nowrap">Chat Now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {
        menuOpen && (
          <div
            className="2xl:hidden fixed inset-0  bg-black/50 bg-opacity-50 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )
      }
    </header >
  );
}
