import usericon from "@/public/icon/users 01.png";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltUp } from "react-icons/fa";

export default function StatCards(y) {
  const statCards = [
    {
      title: "Maid Enquiries",
      value: 50,
      percentage: "+6.2%",
      icon: usericon,
      timeFrame: "Total maid applications",
    },
    {
      title: "Employer Enquiries",
      value: 310,
      percentage: "+6.6%",
      icon: usericon,
      timeFrame: "Employer requests",
    },
    {
      title: "Available Biodatas",
      value: 254,
      percentage: "+6.4%",
      icon: usericon,
      timeFrame: "Available Biodatas",
    },
    {
      title: "Confirmed Biodata",
      value: 35,
      percentage: "+6.2%",
      icon: usericon,
      timeFrame: "Confirmed Biodata",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {statCards.map((card, idx) => (
        <Link href="#"
          key={idx}

          className="p-4 rounded-lg  shadow bg-white flex hover:shadow-[2px_2px_7px_2px_rgba(0,_0,_0,_0.08)] transition-all card flex-col gap-5"
        >
          {/* Top Row */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-md bg-[#C5EFF1] flex items-center justify-center">
              <Image src={card.icon} alt={card.title} width={20} height={20} />
            </div>
            <div>
              <h4 className="text-base lg:text-lg  font-normal text-descriptionColor">{card.title}</h4>
              <div className="text-2xl  font-medium text-black mt-1">{card.value}</div>
            </div>
          </div>


          <div className="flex flex- items-end justify-between  text-gray-500">


            <div className="flex gap-3 items-center">
              <div className="flex items-center justify-start text-green-600 text-lg lg:text-xl gap-0.5">
                <FaLongArrowAltUp className=" text-green-600  " />
                {card.percentage}
              </div>
              <span  >{card.timeFrame}</span>
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
}
