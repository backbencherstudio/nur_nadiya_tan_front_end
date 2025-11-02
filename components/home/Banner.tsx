"use client";
import Link from "next/link";
import { useState } from "react";
import RegistrationForm from "../allForm/RegistrationForm";
import RequestForMaidForm from "../allForm/RequestForMaidForm";
import ButtonReuseable from "../reusable/CustomButton";
function Banner() {
    const [open, setOpen] = useState(false);
    const [openRequest, setOpenRequest] = useState(false);
    return (
        <div>
            <div className="h-full w-full">
                <div className="grid grid-cols-1  md:grid-cols-2   items-center">
                    <div
                        className="2xl:py-[96px] bg-secondaryColor text-center md:text-left md:py-14 lg:py-18 3xl:pr-[140px] py-10 px-10  xl:pl-[40px]   3xl:pl-[120px] h-full"
                    >
                        <h5 className="md:font-semibold font-medium text-lg md:text-2xl lg:text-3xl xl:text-[40px] text-primaryColor  md:mb-4">
                            For Maid{" "}
                        </h5>
                        <h2 className="text-[28px] md:text-[32px] lg:text-5xl xl:text-[60px] 2xl:text-[64px] text-headerColor font-bold leading-[120%]">
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
                                className="!text-headerColor py-3.5 !text-base !w-full !font-medium md:!w-auto"
                            />
                        </div>
                    </div>

                    <div
                        className="2xl:py-[96px] bg-primaryColor text-center md:text-left md:py-14 lg:py-18 py-10 pl-10 xl:pl-[40px]   3xl:pl-[120px] pr-10 lg:pr-14 xl:pr-[100px] 3xl:pr-[227px] h-full"
                       
                    >
                        <h5 className="md:font-semibold font-medium text-lg md:text-2xl lg:text-3xl xl:text-[40px] text-[#FFFFCC]  md:mb-4">
                            For Employer
                        </h5>
                        <h2 className="text-[28px] leading-[120%] md:text-[32px] lg:text-5xl xl:text-[60px] 2xl:text-[64px] text-headerColor font-bold ">
                            Looking for a transfer maid for your{" "}
                            <span className="text-redColor">Home?</span>{" "}
                        </h2>
                        <p className="text-base  font-medium md:text-base lg:text-lg text-headerColor mt-6 md:mt-3 lg:mt-6">
                            View available maids now
                        </p>
                        <div className="lg:mt-10 mt-6 md:mt-3">
                            <Link href="#" onClick={() => setOpenRequest(true)}>
                                <ButtonReuseable
                                    title="Hire a transfer maid"
                                    className="!text-headerColor !bg-secondaryColor py-3.5 !text-base !w-full md:!w-auto !font-medium"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {open && <RegistrationForm open={open} setOpen={setOpen} />}
            {openRequest && <RequestForMaidForm open={openRequest} setOpen={setOpenRequest} />}
        </div>
    );
}

export default Banner;
