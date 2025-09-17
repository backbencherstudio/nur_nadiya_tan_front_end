import Banner from "@/components/home/Banner";
import InfoBanner from "@/components/home/InfoBanner";
import InterviewSection from "@/components/home/InterviewSection";
import JobList from "@/components/home/JobList";
import MaidsHero from "@/components/home/MaidsHero";
import PriceDiscuse from "@/components/pricing/PriceDiscuse";



export default function Home() {
  return (
    <div className="">
      <InfoBanner />
      <Banner />
      <InterviewSection />
      <MaidsHero />
      <JobList />
      <div className="container">
        <div className='pb-10 md:pb-14 lg:pb-29   '>
          <PriceDiscuse />
        </div>
      </div>
    </div>
  );
}
