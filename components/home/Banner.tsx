"use client"
import Link from "next/link"
import { useState } from "react"
import RegistrationForm from "../allForm/RegistrationForm"
import ButtonReuseable from "../reusable/CustomButton"
function Banner() {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div
                className="h-full w-full">
                <div className="grid grid-cols-1  md:grid-cols-2   items-center">
                    <div className="md:py-[96px] py-18 pl-10  xl:pl-[80px]  2xl:pl-[140px] h-full" style={{ backgroundImage: "url('/home/Hero-right.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                        <h5 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-[40px] text-primaryColor mb-4">For Maid </h5>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-headerColor font-bold leading-[120%]"> <span className="text-redColor">No placement fee!</span> Transfer to new employer here </h2>
                        <p className="text-base font-medium md:text-base lg:text-lg text-headerColor mt-6 md:mt-3 lg:mt-6">Let us help you find the right match, fast and easy.</p>
                        <div className="lg:mt-10 mt-6 md:mt-3">
                            <ButtonReuseable onClick={() => setOpen(true)} title="Find new employer" className="!text-headerColor !font-medium" />
                        </div>
                    </div>

                    <div className="md:py-[96px] py-18 pl-10 xl:pl-[80px]  2xl:pl-[140px] pr-10 lg:pr-14 xl:pr-[120px] 2xl:pr-[280px] h-full" style={{ backgroundImage: "url('/home/Hero-left.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >
                        <h5 className="font-semibold text-xl md:text-2xl lg:text-3xl xl:text-[40px] text-whiteColor mb-4">For Employer</h5>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-headerColor font-bold ">Looking for a transfer maid for your  <span className="text-redColor">Home?</span> </h2>
                        <p className="text-base  font-medium md:text-base lg:text-lg text-headerColor mt-6 md:mt-3 lg:mt-6">View available maids now</p>
                        <div className="lg:mt-10 mt-6 md:mt-3">
                            <Link href="/employ-signup">
                                <ButtonReuseable title="Hire a transfer maid" className="!text-headerColor !bg-[#FBDE6E] !font-medium" />
                            </Link>

                        </div>
                    </div>
                </div>

            </div>
            {
                open && <RegistrationForm open={open} setOpen={setOpen} />
            }
        </div>
    )
}

export default Banner

