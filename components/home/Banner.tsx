"use client";
import Link from "next/link";
import { useState } from "react";
import RegistrationForm from "../allForm/RegistrationForm";
import ButtonReuseable from "../reusable/CustomButton";
function Banner() {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div className="h-full w-full">
                <div className="grid grid-cols-1  md:grid-cols-2   items-center">
                    <div
                        className="2xl:py-[96px] text-center md:text-left md:py-14 lg:py-18 3xl:pr-[140px] py-10 px-10  xl:pl-[40px]   3xl:pl-[120px] h-full"
                        style={{
                            backgroundImage: "url('/home/Hero-right.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <h5 className="md:font-semibold font-medium text-lg md:text-2xl lg:text-3xl xl:text-[40px] text-primaryColor  md:mb-4">
                            For Maid{" "}
                        </h5>
                        <h2 className="text-[28px] md:text-4xl lg:text-5xl xl:text-[60px] 2xl:text-[64px] text-headerColor font-bold leading-[120%]">
                            {" "}
                            <span className="text-redColor">No placement fee!</span> Transfer
                            to new employer here{" "}
                        </h2>
                        <p className="text-base font-medium md:text-base lg:text-lg text-headerColor mt-6 md:mt-3 lg:mt-6">
                            Let us help you find the right match, fast and easy.
                        </p>
                        <div className="lg:mt-10 mt-6 md:mt-3">
                            <ButtonReuseable
                                onClick={() => setOpen(true)}
                                title="Find new employer"
                                className="!text-headerColor py-3.5 !text-base !w-full !font-medium"
                            />
                        </div>
                    </div>

                    <div
                        className="2xl:py-[96px] text-center md:py-14 lg:py-18 py-10 pl-10 xl:pl-[40px]   3xl:pl-[120px] pr-10 lg:pr-14 xl:pr-[100px] 3xl:pr-[227px] h-full"
                        style={{
                            backgroundImage: "url('/home/Hero-left.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        <h5 className="md:font-semibold font-medium text-lg md:text-2xl lg:text-3xl xl:text-[40px text-whiteColor mb-2 md:mb-4">
                            For Employer
                        </h5>
                        <h2 className="text-[28px] leading-[120%] md:text-4xl lg:text-5xl xl:text-[60px] 2xl:text-[64px] text-headerColor font-bold ">
                            Looking for a transfer maid for your{" "}
                            <span className="text-redColor">Home?</span>{" "}
                        </h2>
                        <p className="text-base  font-medium md:text-base lg:text-lg text-headerColor mt-6 md:mt-3 lg:mt-6">
                            View available maids now
                        </p>
                        <div className="lg:mt-10 mt-6 md:mt-3">
                            <Link href="/employ-signup">
                                <ButtonReuseable
                                    title="Hire a transfer maid"
                                    className="!text-headerColor !bg-[#FBDE6E] py-3.5 !text-base !w-full !font-medium"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {open && <RegistrationForm open={open} setOpen={setOpen} />}
        </div>
    );
}

export default Banner;
