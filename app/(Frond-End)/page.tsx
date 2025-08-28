import Hero from "@/components/home/Hero";
import InfoBanner from "@/components/home/InfoBanner";
import InterviewSection from "@/components/home/InterviewSection";
import JobList from "@/components/home/JobList";



export default function Home() {
  return (
    <div className="">
      <InfoBanner />
      <Hero />
      <InterviewSection />
      <JobList />
    </div>
  );
}
