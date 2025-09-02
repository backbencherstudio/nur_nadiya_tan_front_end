import interviewImage from "@/public/home/interviewImage.jpg";
import locationIcon from "@/public/icon/loacation.png";
import whatsappIcon from "@/public/icon/whatsapp.png";
import Image from 'next/image';
import ButtonReuseable from "../reusable/CustomButton";

function InterviewSection() {
    const countryData = [
        {
            id: 1,
            country: "Indonesia",
            skills: "often experienced in childcare, cooking, elderly care"
        },
        {
            id: 2,
            country: "Philippines",
            skills: "fluent in English, skilled in infant care, housekeeping"
        },
        {
            id: 3,
            country: "Myanmar",
            skills: "hardworking, fast learners, good with elderly"
        },
        {
            id: 4,
            country: "India / Sri Lanka",
            skills: "experienced in vegetarian cooking, elderly care"
        },
        // {
        //     id: 5,
        //     country: "Cambodia",
        //     skills: "polite and gentle, mostly general housekeeping"
        // }
    ];
    return (
        <section className='my-14 lg:my-[120px]'>
            <div className=' container '>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-7'>
                    <div >
                        <Image src={interviewImage} alt='InterviewImage' width={700} height={700} className='w-full bg-[#E9E9E9] h-auto lg:h-full object-cover rounded-2xl' />
                    </div>
                    <div>
                        <h2 className='text-2xl  lg:text-[32px] xl:text-5xl leading-[120%] text-blackColor font-semibold'>
                            What Are Transfer Maids in Singapore?
                        </h2>
                        <p className='text-base font-normal  lg:text-base text-descriptionColor/90 mt-6 md:mt-3 lg:mt-6'>
                            <span className="text-blackColor font-medium">Transfer maids</span>  (also called  <span className="text-blackColor font-medium">transfer helpers</span>) are foreign domestic workers  <span className="text-blackColor font-medium">already working in Singapore</span>, who are  <span className="text-blackColor font-medium">seeking a new employer</span> before their current contract ends or immediately after it ends.
                        </p>
                        <p className='text-base font-normal  lg:text-base text-descriptionColor/90 mt-6 md:mt-3 lg:mt-6'>
                            They are not coming from overseas — instead, they are already physically in Singapore, and the transfer process is typically faster, easier, and more flexible than hiring a new maid from abroad.
                        </p>
                        <div>
                            <h3 className="text-xl md:text-2xl py-6  text-headerColor font-semibold">Common Nationalities of Transfer Maids in Singapore</h3>
                            <div className=" space-y-3.5">
                                {countryData.map((item) => (
                                    <div key={item.id} className="">
                                        <div className="flex items-start gap-2">
                                            <Image src={locationIcon} alt="locationIcon" width={14} height={14} />
                                            <div>
                                                <p className="text-descriptionColor text-sm xl:text-base leading-relaxed">
                                                    <span className="text-headerColor font-semibold">{item.country} -</span>   {item.skills}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6">
                            <ButtonReuseable title="Interview a maid" className="!text-headerColor !font-medium" icon={<Image src={whatsappIcon} alt="whatsappIcon" width={20} height={20} />} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default InterviewSection
