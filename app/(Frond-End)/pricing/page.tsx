import PaymentOption from '@/components/pricing/PaymentOption';
import PriceDiscuse from '@/components/pricing/PriceDiscuse';
import PricingPlan from '@/components/pricing/PricingPlan';
import CommonHero from '@/components/reusable/CommonHero';
import SectionHeader from '@/components/reusable/SectionHeader';


function page() {

  return (
    <div>
      <div>
        <CommonHero pageName="Our Pricing" />
      </div>
      <div className='container'>
        <div className='py-10 md:py-14 lg:py-29'>
          <SectionHeader title='For Employer Payment Options' description='Choose a payment plan that suits your budget — Installment options available for your convenience.' />
          <PaymentOption />
        </div>
        <div className='pb-10 md:pb-14 lg:pb-29'>

          <SectionHeader title='For Maids — No placement fee' description='We help you transfer to new employers with zero placement fees, making your transition smooth and affordable.' />
          <PricingPlan />

        </div>
        <div className='pb-10 md:pb-14 lg:pb-29'>
          <PriceDiscuse />
        </div>
      </div>
    </div>
  )
}

export default page
