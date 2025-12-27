"use client"
import Image from "next/image";
import { IoCallOutline } from "react-icons/io5";
import ButtonReuseable from "../reusable/CustomButton";

function PriceDiscuse() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+88972767"; // Remove spaces and format properly
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className='py-10 md:py-12 lg:py-16 rounded-xl lg:rounded-3xl' style={{ backgroundImage: "url('/price/price-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <div className="flex items-center justify-center ">
        <div className="text-center">
          <div><h3 className=" text-2xl lg:text-[32px] font-bold">Need a Custom Payment Plan?</h3>
            <p className=" text-base text-descriptionColor max-w-[459px] mt-2">Contact us for a personalized discussion about payment options that work for your budget.</p></div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-4 mt-6 px-10 md:px-2 lg:px-6">
              <ButtonReuseable title="Call Us Now" icon={<IoCallOutline size={18} />} className="!rounded-full !font-medium !px-7 !bg-whiteColor !text-headerColor" />
              <ButtonReuseable onClick={handleWhatsAppClick} title="WhatsApp Chat" icon={<Image src="/icon/whatsapp.png" alt="whatsapp" width={18} height={18} />} className="!rounded-full !font-medium !px-7" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PriceDiscuse
