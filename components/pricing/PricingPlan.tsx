import homeIcon from "@/public/icon/house.svg";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import ButtonReuseable from "../reusable/CustomButton";
export default function PricingPlan() {
    const pricingPlans = [
        {
            id: 1,
            title: "Boarding House",
            price: "25",
            paymentInfo: "Includes 3 meals a day — breakfast, lunch, and dinner.",
            features: [
                { id: 1, feature: "Charging Point ", is_default: true },
                { id: 2, feature: "Free WiFi access", is_default: true },
                { id: 3, feature: "Shared rooms ", is_default: true },
                { id: 4, feature: "24/7 security", is_default: true },
            ],
            buttonText: "Booking",
            backgroundColor: "bg-gray-200", // Basic plan color
        },

    ];

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 md:mt-12">
            <div className="hidden md:block"></div>
            {pricingPlans.map((plan) => (
                <div
                    key={plan.id}
                    className={`w-full p-6 hover:shadow-2xl  rounded-lg cursor-pointer border bg-skyColor text-white transition-all duration-200 group  `}
                >
                    <div className="p-4 bg-white inline-block rounded-lg ">
                        <Image src={homeIcon} alt="house" width={18} height={18} className="" />
                    </div>
                    <div className="border-b text-left mt-4">
                        <h3 className="text-xl lg:text-2xl font-semibold mb-3">{plan.title}</h3>

                        <p className="mb-3  text-white">{plan.paymentInfo}</p>
                        <div className="pb-3 pt-2">
                            <h4 className="text-2xl lg:text-3xl font-semibold mb-3">${plan.price} <span className="text-base font-normal">/day</span></h4>

                        </div>
                    </div>

                    <ul className="space-y-4 mb-4 text-base text-white  xl:text-lg  pt-8">
                        {plan.features.map((feature) => (
                            <li key={feature.id} className="flex gap-2 items-center">
                                {feature.is_default ? (
                                    <span className="text-white"><FaCheckCircle /></span>
                                ) : (
                                    <span className="text-redColor text-xl"><MdOutlineCancel /></span>
                                )}
                                {feature.feature}
                            </li>
                        ))}
                    </ul>
                    <div className="w-full mt-6 lg:mt-8">

                        <ButtonReuseable className="w-full border border-skyColor bg-white  !text-skyColor !rounded-full" title={plan.buttonText} />
                    </div>
                </div>
            ))}
            <div className="hidden md:block"></div>
        </div>
    );
}
