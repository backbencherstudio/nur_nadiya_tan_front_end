import CustomersSay from '@/components/employers/CustomersSay'
import ComparisonTable from '@/components/maids/ComparisonTable'
import CommonHero from '@/components/reusable/CommonHero'
import SectionHeader from '@/components/reusable/SectionHeader'

function page() {
  return (
    <div>
     <div className="">
      <CommonHero pageName="Employers" />
    <section className="my-14 lg:my-[100px]">
      <div>
        <SectionHeader title="Transfer Maid vs New Maid" description="To help you make an informed decision, here's a quick look at why hiring a transfer maid often makes more sense for Singaporean households:"/>
        <ComparisonTable/>
      </div>
      <div>
        <CustomersSay/>
      </div>
     </section>
</div>
    </div>
  )
}

export default page
