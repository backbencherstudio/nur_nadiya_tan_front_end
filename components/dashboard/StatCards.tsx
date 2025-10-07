"use client"
import { useToken } from "@/hooks/useToken";
import usericon from "@/public/icon/users 01.png";
import { UserService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { FaLongArrowAltUp } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";


export default function StatCards() {
    const {token } =useToken()
    
   const getStatCards=async()=>{
     const response = await UserService.getData("/admin/dashboard", token);
     return response?.data?.data;
   }

  const {data, error, isLoading} = useQuery({
    queryKey: ["statCards"],
    queryFn: () => getStatCards(),
  });

  console.log("check query data", data);
  console.log("check isLoading isLoading", isLoading);
  
  const statCards = [
    {
      title: "Maid Enquiries",
      value: data?.total_maid_enquiries,
      percentage: "+6.2%",
      icon: usericon,
      timeFrame: "Total maid applications",
    },
    {
      title: "Employer Enquiries",
      value: data?.total_employer_enquiries,
      percentage: "+6.6%",
      icon: usericon,
      timeFrame: "Employer requests",
    },
    {
      title: "Available Biodatas",
      value: data?.available_bio_data,
      percentage: "+6.4%",
      icon: usericon,
      timeFrame: "Available Biodatas",
    },
    {
      title: "Confirmed Biodata",
      value: data?.confirmed_bio_data,
      percentage: "+6.2%",
      icon: usericon,
      timeFrame: "Confirmed Biodata",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3 gap-4 2xl:gap-4">
      {isLoading ? (
        // Show skeleton cards for loading state
        Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-3 2xl:p-4 rounded-lg shadow bg-white flex flex-col gap-5"
          >
            {/* Top Row Skeleton */}
            <div className="flex items-center gap-4">
              <div className="md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-md bg-[#C5EFF1] flex items-center justify-center">
                <Skeleton className="w-4 h-4 xl:w-5 xl:h-5 " />
              </div>
              <div className="flex-1">
                <Skeleton className="w-full h-4  mb-2" />
                <Skeleton className="w-3/4 h-6 " />
              </div>
            </div>

            {/* Bottom Row Skeleton */}
            <div className="flex items-end justify-between">
              <div className="flex gap-3 items-center">
                <Skeleton className="w-16 h-4 " />
                <Skeleton className="w-20 h-4 " />
              </div>
            </div>
          </div>
        ))
      ) : (
        statCards.map((card, idx) => (
        <Link href="#"
          key={idx}

          className="p-3 2xl:p-4 rounded-lg  shadow bg-white flex hover:shadow-[2px_2px_7px_2px_rgba(0,_0,_0,_0.08)] transition-all card flex-col gap-5"
        >
          {/* Top Row */}
          <div className="flex items-center gap-4">
            <div className="md:w-10 md:h-10 2xl:w-12 2xl:h-12 rounded-md bg-[#C5EFF1] flex items-center justify-center">
            {isLoading ? <Skeleton className="w-4 h-4 z-30 xl:w-5 xl:h-5" /> : <Image src={card.icon} alt={card.title} width={20} height={20} className="w-4 h-4 xl:w-5 xl:h-5" />}
            </div>
            <div>
            {isLoading ? <Skeleton className="w-full h-4" /> : <h4 className="text-base 2xl:text-lg  font-normal text-descriptionColor">{card.title}</h4>}
              {isLoading ? <Skeleton className="w-full h-4" /> : <div className="text-2xl  font-medium text-black mt-1">{card.value}</div>}
            </div>
          </div>


          <div className="flex flex- items-end justify-between  text-gray-500">


            <div className="flex gap-3 items-center">
              {isLoading ? <Skeleton className="w-full h-4 " /> : <div className="flex items-center justify-start text-green-600 text-base 2xl:text-xl gap-0.5">
                <FaLongArrowAltUp className=" text-green-600  " />
                {card.percentage}
              </div>}
              {isLoading ? <Skeleton className="w-full h-4" /> : <span className="text-sm 2xl:text-base" >{card.timeFrame}</span>}
            </div>

          </div>
        </Link>
        ))
      )}
    </div>
  );
}
