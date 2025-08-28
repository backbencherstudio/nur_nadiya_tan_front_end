// components/MaidsHero.tsx
import imageSrc from "@/public/home/maid-hero.png";
import Image from "next/image";
import ButtonReuseable from "../reusable/CustomButton";


export default function MaidsHero() {
    const bullets = [
        "No placement fee",
        "Interview with potential employers",
        "Boarding house available",
        "Work happy!",
    ]

    return (
        <section className="">
            <div className="container">
                <div className="relative grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden rounded-2xl bg-[#ECFAFB] shadow-sm ">
                    {/* Left content */}
                    <div className="px-6 md:px-10 py-8 md:py-10">
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-headerColor leading-tight">
                            Maids come to us for new jobs
                        </h2>
                        <ul className="mt-5 space-y-3 text-slate-700">
                            {bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primaryColor">
                                        {/* check icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-whiteColor"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                                        </svg>
                                    </span>
                                    <span className="text-base md:text-lg">{b}</span>
                                </li>
                            ))}
                        </ul>

                        <div
                            className="mt-6 ">
                            <ButtonReuseable title="Maid Sign up" className="!text-headerColor !font-medium" />
                        </div>
                    </div>

                    {/* Right image */}
                    <div className=" h-full md:h-full"
                        style={{ backgroundImage: "url('/home/maid-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                        <div className="w-[90%] mx-auto h-full">

                            <Image
                                src={imageSrc}
                                alt="Smiling maid"
                                width={600}
                                height={600}
                                className=" h-full w-full object-contain  "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
