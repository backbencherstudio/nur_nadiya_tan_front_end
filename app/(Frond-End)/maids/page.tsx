import MaidpreferPage from "@/components/maids/MaidpreferPage"
import MaidSteps from "@/components/maids/MaidSteps"
import Testimonials from "@/components/maids/Testimonials"
import VideoSection from "@/components/maids/VideoSection"
import PriceDiscuse from "@/components/pricing/PriceDiscuse"
import CommonHero from "@/components/reusable/CommonHero"

function page() {
  return (
    <div className="">
      <CommonHero pageName="Maids" />
      <VideoSection />
      <MaidSteps />
      <section className="mb-14 lg:mb-[100px]">
        <div>
          <Testimonials />
        </div>
        <MaidpreferPage />
        <div className="container">
          <div className='pt-7 md:pt-10 lg:pt-20 '>
            <PriceDiscuse />
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
