import Testimonials from "@/components/maids/Testimonials"
import CommonHero from "@/components/reusable/CommonHero"
import SectionHeader from "@/components/reusable/SectionHeader"

function page() {
  return (
<div>
      <CommonHero pageName="Maids" />
    <section className="my-14 lg:my-[100px]">
      <div className="container">
        <SectionHeader title="Success Stories from Other Maids" description="This section features real-life testimonials from foreign domestic workers (maids) who have successfully changed employers (transferred) with the help of a recruitment agency." />

        <div>
          <Testimonials/>
        </div>
      </div>
      </section>
</div>
  )
}

export default page
