import heroImage from "@/public/home/bannerImage.png"
import Image from "next/image"
import ButtonReuseable from "../reusable/CustomButton"
function Hero() {
  return (
    <div>
       <div 
        className="h-full w-full  pt-10"
        style={{ backgroundImage: "url('/home/Hero.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      >
        <div className="container">
           <div className="grid grid-cols-1  md:grid-cols-3  gap-7 items-center">
            <div >
                <h5 className="font-medium md:text-lg text-primaryColor mb-4">For Maid </h5>
                <h2 className="text-2xl md:text-xl lg:text-[32px] text-headerColor font-semibold">Looking to Transfer to a New Employer in <span className="text-redColor">Singapore?</span> </h2>
                <p className="text-base font-medium md:text-base lg:text-lg text-descriptionColor mt-6 md:mt-3 lg:mt-6">Let us help you find the right match, fast and easy.</p>
                <div className="lg:mt-10 mt-6 md:mt-3">
                <ButtonReuseable title="Register Now" className="!text-headerColor !font-medium"/>
                </div>
            </div> 
            <div className=" px-9 md:px-4 lg:px-7 xl:px-9 pt-[60px] md:pt-[55px] lg:pt-[70px] rounded-t-full bg-primaryColor">
                <Image src={heroImage} alt="hero image" width={2500} height={900} className="w-full h-full"/>
            </div>
            <div className="pb-10 md:pb-0" >
                <h5 className="font-medium md:text-lg text-primaryColor mb-4">For Employer</h5>
                <h2 className="text-2xl md:text-xl lg:text-[32px] text-headerColor font-semibold">Looking for a transfer maid for your  <span className="text-redColor">Home?</span> </h2>
                <p className="text-base  font-medium md:text-base lg:text-lg text-descriptionColor mt-6 md:mt-3 lg:mt-6">View available maids now</p>
                <div className="lg:mt-10 mt-6 md:mt-3">
                <ButtonReuseable title="Hire a transfer maid" className="!text-headerColor !font-medium"/>
                </div>
            </div> 
           </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
