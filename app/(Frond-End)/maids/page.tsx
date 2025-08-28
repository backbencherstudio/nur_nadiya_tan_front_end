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
      <MaidSteps />
      <section className="mb-14 lg:mb-[100px]">
       
          <div>
            <Testimonials />
            <VideoSection />
          </div>
        <MaidpreferPage />
      </section>
    </div>
  )
}

export default page
