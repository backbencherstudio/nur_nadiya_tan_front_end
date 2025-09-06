import SectionHeader from "../reusable/SectionHeader";

function MaidSteps() {
    const supportSteps = [
        {
            id: "01",
            title: "Free Registration & Job Matching",
            description:
                "You don’t need to pay to register. We help match you with employers based on your skills.",
        },
        {
            id: "02",
            title: "No Placement Fee",
            description:
                "No hidden charges. We do not charge any placement fees, so you can transfer to your new employer without worry.",
        },
        {
            id: "03",
            title: "Direct Employer Interviews",
            description:
                "Talk to employers before you decide. We coach you for the interview.",
        },
        {
            id: "04",
            title: "Flexible Transfer Timing",
            description:
                "Ready now or in a few weeks? We help plan your transfer.",
        },
        {
            id: "05",
            title: "Support for MOM Paperwork",
            description:
                "We help you with all transfer documents. Includes work permit, contract, etc.",
        },
        {
            id: "06",
            title: "Boarding & Lodging Support",
            description:
                "Stay in a safe boarding house while waiting for your new employer. No need to return home.",
        },
        {
            id: "07",
            title: "Salary Negotiation Support",
            description:
                "We guide you to ask for fair salary based on your skills and experience.",
        },
        {
            id: "08",
            title: "Pre-Departure & Onboarding Guidance",
            description:
                "Orientation on house rules, duties, safety, and employer expectations so you can start confidently.",
        },
        {
            id: "09",
            title: "Language Support",
            description:
                "We speak English, Mandarin, Burmese, Indonesian, and Tagalog—so you feel safe and understood.",
        },
    ];


    return (
        <div className="py-14 lg:py-[120px] ">
            <section className="container">
                <div>
                    <SectionHeader title="What We Can Help You With" description=" We support you every step of the way" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 h-full lg:grid-cols-3 gap-6   rounded-xl">
                    {supportSteps.map((step) => (
                        <div key={step.id} className="group h-full w-full">
                            <div
                                style={{ boxShadow: "0px 0px 10px 0px #dddddd" }}

                                className="bg-white transition-all group-hover:cursor-pointer hob duration-200 group-hover:shadow-xl  rounded-lg h-full p-6  group-hover:bg-primaryColor"
                            >
                                <div className="text-primaryColor transition-all duration-200 opacity-20 font-bold text-3xl md:text-5xl group-hover:text-whiteColor lg:text-[56px] mb-6">
                                    {step.id}
                                </div>
                                <h4 className="text-lg md:text-xl group-hover:text-whiteColor transition-all duration-200 lg:text-2xl font-semibold text-headerColor  mb-3">
                                    {step.title}
                                </h4>
                                <p className="text-base sm:text-base group-hover:text-whiteColor transition-all duration-200 text-descriptionColor leading-[160%]">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default MaidSteps
