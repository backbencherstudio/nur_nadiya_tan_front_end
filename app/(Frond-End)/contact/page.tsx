
import ContactForm from "@/components/allForm/ContactForm";
import CommonHero from "@/components/reusable/CommonHero";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
function ContactPage() {
  const contactInfo = [
    {
      id: 1,
      icon: <IoCallOutline />,
      link: "tel:65 87427269",
      text: "+65 87427269",
      additionalClass: "",
    },
    {
      id: 2,
      icon: <GrLocation />,
      text: "810 Geylang Rd #03-145D Singapore 409286",
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
       <CommonHero pageName="Contact Us"/>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  py-10 md:py-14 lg:py-24">
          <div className="w-full">
            <h5 className="text-base font-medium text-primaryColor mb-1">Contact Us</h5>
            <h2 className="text-3xl lg:text-[48px] text-headerColor font-semibold">We’re Here to Help—Reach Out Anytime</h2>
            <div className="mt-6 lg:mt-10">
              <ul className="space-y-4 text-base leading-[150%]">
                {contactInfo.map((item) => (
                  <li key={item.id} className="flex gap-3 items-center">
                    <span className="h-9 w-9 lg:w-12 lg:h-12 rounded-lg bg-primaryColor text-blackColor text-xl  lg:text-2xl flex items-center justify-center">{item.icon}</span>
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
