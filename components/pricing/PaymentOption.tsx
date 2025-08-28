import calenderIcon from "@/public/icon/calendar 01.svg";
import Image from 'next/image';
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ButtonReuseable from "../reusable/CustomButton";

function PaymentOption() {
  const paymentOptions = [
    {
      id: 1,
      title: "4-Month Installment Plan",
      description: "Split your payment into 4 easy monthly installments with 0% interest.",
      listItems: [
        "No additional fees",
        "Automatic monthly deduction",
        "Flexible start date",
      ],
      backgroundColor: "bg-gradient-to-l from-[#93F0F4] to-[#27BBC2]", // Tailwind color class for the background
      textColor: "text-white", // Tailwind color class for text
      icon: calenderIcon, // You can use a relevant icon
    },
    {
      id: 2,
      title: "Contact Us for Personal Discussion",
      description: "If our standard payment options don't quite fit your needs, no worries! We are ready to **discuss personally** according to your requirements. Our goal is to find the best solution for you.",
      listItems: [],
      backgroundColor: "bg-gradient-to-l from-[#FFD947] to-[#D4AB0D]", // Tailwind color class for the background
      textColor: "text-white", // Tailwind color class for text
      button: "Contact Us"
    },
  ];
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 items-center h-full gap-10'>

        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className={`flex w-full h-full justify-center  flex-col p-6 md:p-8  rounded-2xl shadow-lg ${option.backgroundColor} ${option.textColor} w-64`}
          >
            <div className="mb-4">
              {option?.icon && <div className="text-3xl pb-5 lg:pb-6">
                <Image src={option?.icon} alt={option?.title} width={30} height={30} />
              </div>
              }
              <h3 className="text-xl md:text-2xl lg:text-[32px] font-semibold">{option.title}</h3>
            </div>
            <p className="mb-4 text-base md:text-lg">{option.description}</p>
            <ul className="space-y-4">
              {option.listItems.map((item, index) => (
                <li key={index} className="flex items-center text-base md:text-lg gap-2">
                  <span><MdKeyboardDoubleArrowRight /></span> {item}
                </li>
              ))}
            </ul>
            {option?.button && <Link href="/contact" className="text-center mx-auto"> <ButtonReuseable title={option?.button} className="!text-[#F9C80E] !bg-whiteColor  !font-medium" />
            </Link>}
          </div>
        ))}

      </div>
    </div>
  )
}

export default PaymentOption
