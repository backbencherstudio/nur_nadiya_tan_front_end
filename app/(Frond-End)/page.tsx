import Banner from "@/components/home/Banner";
import InfoBanner from "@/components/home/InfoBanner";
import InterviewSection from "@/components/home/InterviewSection";
import JobList from "@/components/home/JobList";
import MaidsHero from "@/components/home/MaidsHero";



export default function Home() {
  return (
    <div className="">
      <InfoBanner />
      <Banner />
      <InterviewSection />
      <MaidsHero />
      <JobList />
    </div>
  );
}
