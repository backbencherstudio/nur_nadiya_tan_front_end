import PaymentOption from '@/components/pricing/PaymentOption';
import PricingPlan from '@/components/pricing/PricingPlan';
import CommonHero from '@/components/reusable/CommonHero';
import SectionHeader from '@/components/reusable/SectionHeader';


function page() {
   
  return (
    <div>
        <div>
            <CommonHero pageName="Our Pricing" />
        </div>
       <div className='py-10 md:py-14 lg:py-29'>
        <div className='container'>
            <SectionHeader title='Payment Options' description='We offer flexible payment solutions to suit your needs' />
            <PaymentOption />
        </div>
       </div>
       <div className='pb-10 md:pb-14 lg:pb-29'>
        <div className='container'>
            <SectionHeader title='Flexible Pricing Options' description='Flexible payment options available. Contact us personally for a detailed discussion about payment plans that suit your needs.' />
            <PricingPlan />
        </div>
       </div>
    </div>
  )
}

export default page
