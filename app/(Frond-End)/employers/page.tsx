import CustomersSay from '@/components/employers/CustomersSay'

import VideoCarousel from '@/components/employers/VideoCarousel'
import Work from '@/components/employers/Work'
import ComparisonTable from '@/components/maids/ComparisonTable'
import CommonHero from '@/components/reusable/CommonHero'
import SectionHeader from '@/components/reusable/SectionHeader'

function page() {
  return (
    <div>
      <div className="">
        <CommonHero pageName="Employers" />
        <VideoCarousel />
        <section className="">
          <div className='py-b lg:pb-[120px] '>
            <SectionHeader title="Transfer Maid vs New Maid" description="To help you make an informed decision, here's a quick look at why hiring a transfer maid often makes more sense for Singaporean households:" />
            <ComparisonTable />
          </div>
          <div>
            <Work />
          </div>
          <div>
            <CustomersSay />

          </div>
        </section>
      </div>
    </div>
  )
}

export default page
