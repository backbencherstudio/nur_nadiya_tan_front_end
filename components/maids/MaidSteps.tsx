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
            title: "Flexible Transfer Timing",
            description:
                "Ready now or in a few weeks? We help plan your transfer.",
        },
        {
            id: "03",
            title: "Direct Employer Interviews",
            description:
                "Talk to employers before you decide. We coach you for the interview.",
        },
        {
            id: "04",
            title: "Support for MOM Paperwork",
            description:
                "We help you with all transfer documents, including work permit, contract, etc.",
        },
        {
            id: "05",
            title: "Boarding & Lodging Support",
            description:
                "Stay in a safe boarding house while waiting for your new employer. No need to return home.",
        },
        {
            id: "06",
            title: "Salary Negotiation Support",
            description:
                "We guide you to ask for fair salary based on your skills and experience.",
        },
    ];

    return (
        <div className="py-14 lg:py-[120px] bg-yellow-50">
            <section className="container">
                <div>
                    <SectionHeader title="What We Can Help You With" description="Your trusted agency with 30 years of experience – we support you every step of the way" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6   rounded-xl">
                    {supportSteps.map((step) => (
                        <div
                        style={{ boxShadow: "0px 0px 10px 0px #dddddd" }}
                            key={step.id}
                            className="bg-white rounded-lg  p-6 "
                        >
                            <div className="text-primaryColor opacity-20 font-bold text-3xl md:text-5xl lg:text-[56px] mb-6">
                                {step.id}
                            </div>
                            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-headerColor  mb-3">
                                {step.title}
                            </h4>
                            <p className="text-base sm:text-base text-descriptionColor leading-[160%]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default MaidSteps
