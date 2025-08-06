import PaymentOption from '@/components/pricing/PaymentOption';
import CommonHero from '@/components/reusable/CommonHero';
import SectionHeader from '@/components/reusable/SectionHeader';
import calenderIcon from "@/public/icon/calendar 01.svg";
import paymentIcon from "@/public/icon/pyment.svg";
import Image from 'next/image';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function page() {
   
  return (
    <div>
        <div>
            <CommonHero pageName="Our Pricing" />
        </div>
       <div className='py-10 md:py-14 lg:py-24'>
        <div className='container'>
            <SectionHeader title='Payment Options' description='We offer flexible payment solutions to suit your needs' />
            <PaymentOption />
        </div>
       </div>
    </div>
  )
}

export default page
