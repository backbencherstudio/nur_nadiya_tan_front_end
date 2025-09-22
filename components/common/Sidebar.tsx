"use client";
import { TbLogout2 } from "react-icons/tb";

import mainLogo from "@/public/icon/mainlogo.png";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";
interface NavItem {
  icon: any;
  label: string;
  href: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: NavItem[] = [
  {
    icon: <RiHome6Line />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <FaPlus />,
    label: "Add Enquiry",
    href: "/dashboard/add-enquiry",
  },
  {
    icon: <MdOutlineEventAvailable />,
    label: "Biodata Management",
    href: "/dashboard/biodata-management",
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter()
  const isActive = (href: string): boolean => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };
  const handleLogout = () => {
   
    router.push("/login")

  }
  return (
    <div className="h-screen  ">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="absolute top-0 left-0 w-full h-full z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`
          ${isOpen
            ? "z-50 h-full overflow-hidden absolute top-0 left-0"
            : "h-full"
          }
          flex flex-col
          min-h-[calc(100vh-100px)] 
          bg-[#060A2F] 
         
          shadow-[0px_-0.3px_5.5px_0px_rgba(0,0,0,0.02)]
        
          p-5 w-full overflow-y-auto
        `}
      >
        <div className="flex justify-end lg:hidden cursor-pointer">
          <button onClick={onClose}>
            <X className="text-whiteColor" />
          </button>
        </div>

        {/* Account Section */}
        <div className="my-4 ">
          <Link
            href={"/dashboard"}
            className="text-white flex justify-start lg:justify-center pb-5 text-xl lg:text-3xl font-semibold tracking-wide"
          >
            <Image
              src={mainLogo}
              alt="main logo "
              width={118}
              height={29}
              className="w-20 md:w-[100px]"
            />
          </Link>
          <div className=" space-y-2">

            {navItems.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={onClose}
                  className={`
        flex items-center justify-between group gap-3 px-3 py-2.5 lg:py-3 rounded-lg hover:text-whiteColor  hover:bg-primaryColor
        transition-colors duration-200
        ${active ? "bg-primaryColor" : ""}
      `}
                >
                  <div className="flex gap-2 items-center">
                    <div
                      className={`
            w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 rounded-full
            text-xl font-medium
            ${active
                          ? "text-whiteColor"
                          : "text-whiteColor group-hover:text-whiteColor"
                        }
          `}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`
            text-base font-medium 
            ${active
                          ? "text-whiteColor"
                          : "text-whiteColor group-hover:text-whiteColor"
                        }
          `}
                    >
                      {item.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Log out section */}
        <div className="mt-auto pt-4">
          <button

            onClick={handleLogout}
            className="flex items-center bg-primaryColor/10 cursor-pointer gap-3 px-3 py-3 hover:bg-primaryColor w-full rounded-lg transition-colors duration-200 "
          >
            <div className="w-[30px] h-[30px] flex justify-center items-center flex-shrink-0 ">
              <TbLogout2 className="text-whiteColor"/>
            </div>
            <span className="text-base font-normal text-whiteColor">
              Log Out Account
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
