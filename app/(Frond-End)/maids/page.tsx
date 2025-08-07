import MaidpreferPage from "@/components/maids/MaidpreferPage"
import MaidSteps from "@/components/maids/MaidSteps"
import Testimonials from "@/components/maids/Testimonials"
import VideoSection from "@/components/maids/VideoSection"
import CommonHero from "@/components/reusable/CommonHero"
import SectionHeader from "@/components/reusable/SectionHeader"

function page() {
  return (
<div className="">
      <CommonHero pageName="Maids" />
    <section className="my-14 lg:my-[100px]">
      <div className="container">
        <SectionHeader title="Success Stories from Other Maids" description="This section features real-life testimonials from foreign domestic workers (maids) who have successfully changed employers (transferred) with the help of a recruitment agency." />

        <div>
          <Testimonials/>
          <VideoSection/>
         
        </div>
      </div>
       <MaidSteps/>
       <MaidpreferPage/>
      </section>
</div>
  )
}

export default page
