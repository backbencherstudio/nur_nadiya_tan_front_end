import m2 from "@/public/icon/Bolt.svg";
import m1 from "@/public/icon/friends.svg";
import m3 from "@/public/icon/ShieldAlt.svg";
import Image from "next/image";
import SectionHeader from "../reusable/SectionHeader";
function MaidpreferPage() {
  const featureCards = [
    {
      id: "01",
      icon: m1,
      title: "No Placement Fee Deduction",
      description: "Zero placement fees - Maids keep 100% of their salary with new employers",
    },
    {
      id: "02", 
      icon: m2,
      title: "Boarding House Available",
      description: "Safe boarding facilities available during job transitions - No homeless periods!",
    },
    {
      id: "03",
      icon: m3,
      title: "Faster Re-employment",
      description: "Average 5-7 days waiting time for new employers (vs 1-2 months for fresh maids)",
    },
  ];

  return (
    <div className="py-14 lg:py-[120px] ">
      <section className="container">
        <div>
          <SectionHeader 
            title="Why Maids Prefer Us" 
            description="No hidden fees, safe accommodation, and faster job placements — we prioritize your comfort and future." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-xl">
          {featureCards.map((card) => (
            <div
              style={{ boxShadow: "0px 0px 2px 0px #dddddd" }}
              key={card.id}
              className="bg-[#F8FAFB] rounded-lg p-6 "
            >
              <div className="w-[40px] h-[40px] md:w-[56px] md:h-[56px]  bg-primaryColor/10 rounded-md mb-6 flex items-center justify-center">
               <Image src={card.icon} alt={card.title} width={32} height={32} className="w-[30px] h-[30px]" />
              </div>
              <h4 className="text-lg   font-semibold text-headerColor mb-3">
                {card.title}
              </h4>
              <p className="text-base sm:text-base text-descriptionColor leading-[160%]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MaidpreferPage
