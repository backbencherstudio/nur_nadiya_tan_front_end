import graduationIcon from "@/public/icon/cap.svg";
import formIcon from "@/public/icon/form.svg";
import videoIcon from "@/public/icon/interview.svg";
import fileIcon from "@/public/icon/note.svg";
import searchIcon from "@/public/icon/search.svg";
import cogsIcon from "@/public/icon/setting.svg";
import Image from 'next/image';
import SectionHeader from '../reusable/SectionHeader';
function Work() {
    const steps = [
        {
            id: 1,
            title: "Submit Form",
            description: "Start by filling out our simple online inquiry form or whatsapp us.",
            icon: formIcon,
            position: "left"
        },
        {
            id: 2,
            title: "Shortlisting Biodata",
            description: "Our team will present you with a curated list of suitable biodata based on your requirements.",
            icon: searchIcon,
            position: "right"
        },
        {
            id: 3,
            title: "Interview",
            description: "Conduct interviews with shortlisted candidates via video call or in person.",
            icon: videoIcon,
            position: "left"
        },
        {
            id: 4,
            title: "Transfer Paperwork",
            description: "We handle all the necessary transfer documentation and administrative tasks.",
            icon: fileIcon,
            position: "right"
        },
        {
            id: 5,
            title: "Training (Optional)",
            description: "If needed, we can arrange additional training for your selected helper.",
            icon: graduationIcon,
            position: "left"
        },
        {
            id: 6,
            title: "Start Work",
            description: "Your new helper begins work, ready to assist your family.",
            icon: cogsIcon,
            position: "right"
        }
    ];

    return (
        <div className="pb-[200px] md:pb-[240px]">
            <section className="container">
                <div>
                    <SectionHeader
                        title="How It Works"
                        description="We've designed our process to be as straightforward as possible. Here's how you can find your ideal helper with us"
                    />
                </div>
                <div className="relative mt-16">
                    {/* Vertical dashed line */}
                    <div className="relative md:left-1/2 left-0 transform  md:-translate-x-1/2 h-[883px] w-[1px] border-l-2 border-dashed border-teal-400">
                        {
                            steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`relative ${index % 2 !== 0 ? `left-[0px] ` : `left-0 md:-left-[200px] lg:-left-[250px]`} h-[1px] w-[150px] md:w-[200px] lg:w-[250px] border-b-2 border-dashed border-teal-400`}
                                    style={{ top: `${175 * index}px` }}
                                >
                                    <div className={`absolute ${index % 2 !== 0 ? `-right-[36px]` : `-right-[36px] md:-left-[250px] lg:-left-[300px]`}  -top-[16px]`} >
                                        <div className="flex flex-col justify-center items-center mb-3">
                                            <div className="border rounded-lg p-[2px] w-9 h-9 mx-auto border-skyColor">
                                                <div className="bg-skyColor w-full h-full rounded-md flex items-center justify-center mr-3">
                                                    <Image src={step.icon} alt={step.title} width={18} height={18} />
                                                </div>
                                            </div>
                                            <div className="absolute left-1/2 transform -translate-x-1/2 text-center top-11 w-[250px] md:w-[300px]">
                                                <h3 className="text-lg lg:text-2xl font-semibold text-headerColor">{step.title}</h3>
                                                <p className="text-gray-600 text-sm md:text-base leading-[160%] mt-1">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>
        </div>
    )
}

export default Work
