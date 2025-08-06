
import ContactForm from "@/components/allForm/ContactForm";
import Image from "next/image";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      icon: <IoCallOutline />,
      link: "tel:602-774-4735",
      text: "+602-774-4735",
      additionalClass: "",
    },
    {
      id: 2,
      icon: <GrLocation />,
      text: "2715 Ash Dr. San Jose, South Dakota",
       additionalClass: " break-all text-descriptionColor",
    },
    {
      id: 3,
      icon: <IoMailOutline />,
      link: "mailto:admin@transfermaidsingapore.com",
      text: "admin@transfermaidsingapore.com",
      additionalClass: " break-all text-descriptionColor",
    },
  ];
  return (
    <div className="bg-[#F8FAFB] h-full">
      <div className=" relative">
        <Image
          src="/hero.jpg"
          alt="contact image"
          width={2500}
          height={200}
          className=" w-full h-24 lg:h-auto"
        />
        <div className=" absolute top-0 left-0 w-full h-full">
          <div className="container flex  items-center h-full">
            <div className="">
              <h2 className=" text-2xl lg:text-[48px] text-headerColor font-semibold">
                {" "}
                Contact us
              </h2>
              <div className="flex items-center text-sm md:text-base font-medium gap-2 mt-1">
                <Link className="text-grayColor1" href="/">Home</Link> <IoIosArrowForward /> <p>Contact Us</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  py-10 md:py-14 lg:py-24">
          <div className="w-full">
            <h5 className="text-base font-medium text-primaryColor mb-1">Contact Us</h5>
            <h2 className="text-3xl lg:text-[48px] text-headerColor font-semibold">We’re Here to Help—Reach Out Anytime</h2>
            <div className="mt-6 lg:mt-10">
              <ul className="space-y-4 text-base leading-[150%]">
                {contactInfo.map((item) => (
                  <li key={item.id} className="flex gap-3 items-center">
                    <span className="h-9 w-9 lg:w-12 lg:h-12 rounded-lg bg-primaryColor text-white text-xl  lg:text-2xl flex items-center justify-center">{item.icon}</span>
                    {item.link ? (
                      <Link href={item.link} className={`${item.additionalClass} text-descriptionColor`}>
                        {item.text}
                      </Link>
                    ) : (
                      <p className={`${item.additionalClass} text-descriptionColor`}>{item.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ContactForm/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
