"use client";
import logo from "@/public/icon/mainlogo.png";
import Image from "next/image";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
const quickLinks = [
  { name: "Pricing", slug: "/pricing" },
  { name: "Employers", slug: "/employers" },
  { name: "Maids", slug: "/maids" },
  { name: "Contact", slug: "/contact" },

];
const InfoLinks = [
  { name: "Terms & Conditions", slug: "/terms-and-condition" },
  { name: "Privacy Policy", slug: "/privacy-policy" },
  { name: "Terms of Use", slug: "/terms-of-use" },
  { name: "Help", slug: "/contact" },

];
export default function Footer() {
  return (
    <footer className="bg-footerColor px-4">
      <div className=" text-white py-12 ">
        <div className=" container grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Logo & Newsletter */}
          <div className=" md:col-span-6 lg:col-span-4">
            <div className=" md:w-[328px]">
              <div className=" mb-8">
                <Image src={logo} alt="logo" width={100} height={100} className="w-12 md:w-[80px]" />
              </div>
              <p className="text-base leading-[150%] mb-6">
                Explore profiles of reliable transfer maids in Singapore, experienced in childcare, elderly care and infant care, cooking, and household chores,
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-3 text-base leading-[150%]">
              {quickLinks.map(({ name, slug }) => (
                <li key={slug}>
                  <Link href={slug} className="hover:text-primaryColor">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Column 3: Contact Info */}
          <div className="md:col-span-3 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-3 text-base leading-[150%]">
              {InfoLinks.map(({ name, slug }) => (
                <li key={slug}>
                  <Link href={slug} className="hover:text-primaryColor">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social Icons */}
          <div className="md:col-span-6 lg:col-span-4 flex-col lg:flex items-end ">
            <div>

              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-4 text-base leading-[150%]">
                <li className=" flex gap-3 items-center">
                  <IoCallOutline />
                  <Link href="tel:602-774-4735" className="hover:text-primaryColor">
                    +65 87427269
                  </Link>
                </li>
                <li className=" flex gap-3 items-start ">
                  <GrLocation className="mt-1" /> 810 Geylang Rd #03-145D Singapore 409286
                </li>
                <li className=" flex gap-3 items-center">
                  <IoMailOutline className="text-white" />
                  <Link
                    href="mailto:hello@travelinfo.com"
                    className="hover:text-primaryColor break-all "
                  >
                    admin@transfermaidsingapore.com
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
