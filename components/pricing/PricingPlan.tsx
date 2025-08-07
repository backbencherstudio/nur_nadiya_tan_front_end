import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import ButtonReuseable from "../reusable/CustomButton";

export default function PricingPlan() {
    const pricingPlans = [
        {
            id: 1,
            title: "Basic Transfer",
            price: "$500",
            paymentInfo: "One-time payment",
            features: [
                { id: 1, feature: "Professional maid matching service", is_default: true },
                { id: 2, feature: "Pre-screened and verified profiles", is_default: true },
                { id: 3, feature: "Direct contact with available maids", is_default: true },
                { id: 4, feature: "Transfer process guidance", is_default: true },
                { id: 5, feature: "24/7 customer support", is_default: false },
                { id: 6, feature: "Contract assistance", is_default: false },
                { id: 7, feature: "Replacement guarantee", is_default: false },
                { id: 8, feature: "Express 24-48 hour matching", is_default: false },
                { id: 9, feature: "Priority customer support", is_default: false },
            ],
            buttonText: "Contact for Discussion",
            backgroundColor: "bg-gray-200", // Basic plan color
        },
        {
            id: 2,
            title: "Premium Transfer",
            price: "$800",
            paymentInfo: "4 Months Installment Payment Available",
            features: [
                { id: 1, feature: "Professional maid matching service", is_default: true },
                { id: 2, feature: "Pre-screened and verified profiles", is_default: true },
                { id: 3, feature: "Direct contact with available maids", is_default: true },
                { id: 4, feature: "Transfer process guidance", is_default: true },
                { id: 5, feature: "24/7 customer support", is_default: true },
                { id: 6, feature: "Contract assistance", is_default: true },
                { id: 7, feature: "Replacement guarantee", is_default: true },
                { id: 8, feature: "Express 24-48 hour matching", is_default: false },
                { id: 9, feature: "Priority customer support", is_default: false },
            ],
            buttonText: "Contact for Discussion",
            backgroundColor: "bg-teal-500", // Premium plan color
        },
        {
            id: 3,
            title: "Express Transfer",
            price: "$1200",
            paymentInfo: "Priority service",
            features: [
                { id: 1, feature: "Professional maid matching service", is_default: true },
                { id: 2, feature: "Pre-screened and verified profiles", is_default: true },
                { id: 3, feature: "Direct contact with available maids", is_default: true },
                { id: 4, feature: "Transfer process guidance", is_default: true },
                { id: 5, feature: "24/7 customer support", is_default: true },
                { id: 6, feature: "Contract assistance", is_default: true },
                { id: 7, feature: "Replacement guarantee", is_default: true },
                { id: 8, feature: "Express 24-48 hour matching", is_default: true },
                { id: 9, feature: "Priority customer support", is_default: true },
            ],
            buttonText: "Contact for Discussion",

        },
    ];

    return (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            {pricingPlans.map((plan) => (
                <div
                    key={plan.id}
                    className={`w-full p-6 rounded-lg cursor-pointer border hover:bg-primaryColor hover:text-white transition-all duration-200 group  text-headerColor`}
                >
                    <div className="border-b text-center">
                        <h3 className="text-xl lg:text-2xl font-semibold mb-3">{plan.title}</h3>
                        <div className="text-2xl lg:text-3xl font-semibold mb-3">{plan.price}</div>
                        <p className="mb-3 text-descriptionColor/80 group-hover:text-white">{plan.paymentInfo}</p>
                    </div>

                    <ul className="space-y-4 mb-4 text-base group-hover:text-white text-descriptionColor xl:text-lg  pt-8">
                        {plan.features.map((feature) => (
                            <li key={feature.id} className="flex gap-2 items-center">
                                {feature.is_default ? (
                                    <span className="text-primaryColor group-hover:text-white"><FaCheckCircle/></span>
                                ) : (
                                    <span className="text-redColor text-xl"><MdOutlineCancel/></span>
                                )}
                                {feature.feature}
                            </li>
                        ))}
                    </ul>
                    <div className="w-full mt-6 lg:mt-8">

                    <ButtonReuseable className="w-full border border-primaryColor bg-white  !text-primaryColor !rounded-full" title={plan.buttonText} />
                    </div>
                </div>
            ))}
        </div>
    );
}
